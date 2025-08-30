// services/alertService.js
import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// thresholds (can be overridden with .env)
const TIDE_THRESHOLD = Number(process.env.TIDE_THRESHOLD) || 1.2;       // meters
const POLLUTION_THRESHOLD = Number(process.env.POLLUTION_THRESHOLD) || 100; // PM2.5
const TEMP_THRESHOLD = Number(process.env.TEMP_THRESHOLD) || 35;     // Celsius

export async function checkThresholds({ tide, weather, pollution, location }) {
  const alerts = [];
  const now = new Date().toISOString();

  try {
    if (typeof tide === "number" && tide > TIDE_THRESHOLD) {
      const message = `⚠️ High tide in ${location}: ${tide.toFixed(2)} m (threshold ${TIDE_THRESHOLD} m)`;
      const alert = { type: "Tide", message, time: now };
      alerts.push(alert);
      await sendSMS(message);
    }

    if (typeof pollution === "number" && pollution > POLLUTION_THRESHOLD) {
      const message = `🌫️ High PM2.5 in ${location}: ${pollution} µg/m³ (threshold ${POLLUTION_THRESHOLD})`;
      const alert = { type: "Pollution", message, time: now };
      alerts.push(alert);
      await sendSMS(message);
    }

    if (typeof weather === "number" && weather > TEMP_THRESHOLD) {
      const message = `🔥 High temperature in ${location}: ${weather.toFixed(1)}°C (threshold ${TEMP_THRESHOLD}°C)`;
      const alert = { type: "Weather", message, time: now };
      alerts.push(alert);
      await sendSMS(message);
    }
  } catch (err) {
    console.error("Error while checking thresholds / sending SMS:", err.message);
    // still return any alerts collected so frontend can display them
  }

  return alerts;
}

async function sendSMS(message) {
  if (!process.env.TWILIO_SID || !process.env.TWILIO_AUTH || !process.env.TWILIO_PHONE || !process.env.ALERT_PHONE) {
    console.warn("Twilio not configured - skipping SMS. Make sure TWILIO_SID, TWILIO_AUTH, TWILIO_PHONE and ALERT_PHONE exist in .env");
    return;
  }
  try {
    const res = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: process.env.ALERT_PHONE,
    });
    console.log("📩 SMS sent:", res.sid);
  } catch (err) {
    console.error("Twilio error:", err.message);
  }
}
