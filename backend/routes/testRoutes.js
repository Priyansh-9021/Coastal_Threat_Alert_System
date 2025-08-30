import express from "express";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();



const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);


router.get("/send-demo-sms", async (req, res) => {
  try {
    const message = await client.messages.create({
      body: "⚠️ CTAS Demo Alert: High Tide detected at Porbandar (Test SMS)",
      from: process.env.TWILIO_PHONE,
      to: process.env.ALERT_PHONE,
    });
    res.json({ success: true, sid: message.sid });
  } catch (err) {
    console.error("Twilio error", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
