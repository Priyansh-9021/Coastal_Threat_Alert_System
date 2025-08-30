// backend/utils/scheduler.js
import cron from "node-cron";
import { coastalLocations } from "../config/locations.js";
import { fetchTideForecast } from "../services/tideService.js";
import { fetchWeatherForecast, fetchPollutionForecast } from "../services/weatherService.js";
import { checkThresholds } from "../services/alertService.js";

export function startScheduler() {
  console.log("⏰ Scheduler started: checking every 5 minutes");

  // Run every 5 minutes
  cron.schedule("*/5 * * * *", async () => {
    console.log("🔍 Running scheduled coastal data check...");
    try {
      for (const loc of coastalLocations) {
        const tideArr = await fetchTideForecast(loc.lat, loc.lng);
        const weatherArr = await fetchWeatherForecast(loc.lat, loc.lng);
        const pollutionArr = await fetchPollutionForecast(loc.lat, loc.lng);

        // ✅ Extract current samples
        const currentTide = Array.isArray(tideArr) && tideArr.length ? Number(tideArr[0].height) : null;
        const currentTemp = Array.isArray(weatherArr) && weatherArr.length ? Number(weatherArr[0].temp) : null;
        const currentPollution = Array.isArray(pollutionArr) && pollutionArr.length ? Number(pollutionArr[0].pm2_5) : null;

        // ✅ Pass both current values + forecasts
        const alerts = await checkThresholds({
          location: loc.name,
          tide: currentTide,
          tideForecast: tideArr,
          weather: currentTemp,
          weatherForecast: weatherArr,
          pollution: currentPollution,
          pollutionForecast: pollutionArr
        });

        if (alerts.length > 0) {
          console.log(`⚠ Alerts generated for ${loc.name}:`, alerts);
        } else {
          console.log(`✅ No alerts for ${loc.name}`);
        }
      }
    } catch (err) {
      console.error("❌ Scheduler error:", err.message);
    }
  });
}
