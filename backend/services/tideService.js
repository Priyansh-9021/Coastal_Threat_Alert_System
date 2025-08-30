// services/tideService.js
import axios from "axios";

export async function fetchTideForecast(lat, lon) {
  const api = "https://www.worldtides.info/api/v3";
  try {
    const params = {
      heights: "",
      lat,
      lon,
      key: process.env.WORLDTIDES_KEY,
      interval: 60,
      length: 24 * 60 * 60 // 24 hours in seconds
    };
    const url = api;
    console.log(`[tideService] Requesting tide forecast for ${lat},${lon} -> ${url} params=${JSON.stringify(params)}`);
    const { data, status } = await axios.get(url, { params, timeout: 15000 });
    console.log(`[tideService] status=${status} heights=${Array.isArray(data.heights) ? data.heights.length : 0}`);
    const heights = Array.isArray(data?.heights) ? data.heights : [];
    return heights.slice(0, 24).map((h) => {
      const time = h.date || (h.dt ? new Date(h.dt * 1000).toISOString() : new Date().toISOString());
      const height = typeof h.height === "number" ? h.height : Number(h.height ?? h.value ?? 0);
      return { time, height };
    });
  } catch (err) {
    console.error("[tideService] ERROR:", err.message, err.response ? { status: err.response.status, data: err.response.data } : "");
    throw err;
  }
}
