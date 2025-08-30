// services/weatherService.js
import axios from "axios";

// services/weatherService.js
export async function fetchWeatherForecast(lat, lon) {
  const url = "https://api.openweathermap.org/data/2.5/forecast"; // ✅ free tier endpoint
  try {
    console.log(`[weatherService] Requesting 5-day forecast for ${lat},${lon} -> ${url}`);
    const { data, status } = await axios.get(url, {
      params: {
        lat,
        lon,
        units: "metric",
        appid: process.env.OPENWEATHER_KEY,
      },
      timeout: 15000,
    });

    console.log(`[weatherService] forecast status=${status} cnt=${data.cnt}`);

    // list = 3-hour intervals, 40 entries (5 days)
    const list = Array.isArray(data?.list) ? data.list : [];
    return list.slice(0, 8).map((h) => ({
      time: h.dt_txt, // already formatted string like "2025-08-30 12:00:00"
      temp: h.main?.temp,
      feels_like: h.main?.feels_like,
      humidity: h.main?.humidity,
    }));
  } catch (err) {
    console.error("[weatherService] FORECAST ERROR:", err.message, err.response ? { status: err.response.status, data: err.response.data } : "");
    throw err;
  }
}


export async function fetchPollutionForecast(lat, lon) {
  const url = "https://api.openweathermap.org/data/2.5/air_pollution/forecast";
  try {
    console.log(`[weatherService] Requesting pollution forecast for ${lat},${lon} -> ${url}`);
    const { data, status } = await axios.get(url, {
      params: { lat, lon, appid: process.env.OPENWEATHER_KEY },
      timeout: 15000,
    });
    console.log(`[weatherService] pollution status=${status} list=${Array.isArray(data.list) ? data.list.length : 0}`);
    const list = Array.isArray(data?.list) ? data.list : [];
    return list.slice(0, 24).map((it) => ({
      time: new Date(it.dt * 1000).toISOString(),
      pm2_5: it.components?.pm2_5 ?? null,
    }));
  } catch (err) {
    console.error("[weatherService] POLLUTION ERROR:", err.message, err.response ? { status: err.response.status, data: err.response.data } : "");
    throw err;
  }
}
