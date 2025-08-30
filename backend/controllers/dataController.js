// controllers/dataController.js
import { coastalLocations } from "../config/locations.js";
import { fetchTideForecast } from "../services/tideService.js";
import { fetchWeatherForecast, fetchPollutionForecast } from "../services/weatherService.js";
import { getCache, setCache } from "../utils/cache.js";

export const getDataForLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const loc = coastalLocations.find(
      (l) => l.name.toLowerCase() === location.toLowerCase()
    );
    if (!loc) return res.status(404).json({ error: "Location not found" });

    const cacheKey = `forecast:${loc.name}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const [tideForecast, weatherForecast, pollutionForecast] = await Promise.all([
      fetchTideForecast(loc.lat, loc.lng),
      fetchWeatherForecast(loc.lat, loc.lng),
      fetchPollutionForecast(loc.lat, loc.lng).catch(() => []),
    ]);

    // Simple upcoming alerts (first exceedance within next 24h)
    const TIDE_THRESHOLD = Number(process.env.TIDE_THRESHOLD) || 6;
    const POLLUTION_THRESHOLD = Number(process.env.POLLUTION_THRESHOLD) || 100;
    const TEMP_THRESHOLD = Number(process.env.TEMP_THRESHOLD) || 35;

    const upcomingAlerts = [];
    const firstHighTide = tideForecast.find((h) => h?.height != null && h.height > TIDE_THRESHOLD);
    if (firstHighTide) {
      upcomingAlerts.push({
        type: "Tide",
        message: `Predicted high tide ${firstHighTide.height.toFixed(2)} m at ${firstHighTide.time}`,
        time: firstHighTide.time,
      });
    }

    const firstHighPm = pollutionForecast.find(
      (p) => p?.pm2_5 != null && p.pm2_5 > POLLUTION_THRESHOLD
    );
    if (firstHighPm) {
      upcomingAlerts.push({
        type: "Pollution",
        message: `Predicted high PM2.5 ${firstHighPm.pm2_5} µg/m³ at ${firstHighPm.time}`,
        time: firstHighPm.time,
      });
    }

    const firstHighTemp = weatherForecast.find(
      (w) => w?.temp != null && w.temp > TEMP_THRESHOLD
    );
    if (firstHighTemp) {
      upcomingAlerts.push({
        type: "Weather",
        message: `Predicted high temperature ${firstHighTemp.temp.toFixed(1)}°C at ${firstHighTemp.time}`,
        time: firstHighTemp.time,
      });
    }

    const payload = {
      location: loc.name,
      timestamp: new Date().toISOString(),
      tideForecast,
      weatherForecast,
      pollutionForecast,
      upcomingAlerts,
    };

    // cache for 10 minutes
    setCache(cacheKey, payload, 10 * 60 * 1000);

    res.json(payload);
  } catch (err) {
    console.error("❌ Forecast error:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
