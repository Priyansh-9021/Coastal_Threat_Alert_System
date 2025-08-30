# 🌊 Coastal Threat Alert System (CTAS)  
**Real-time Monitoring • Smart Alerts • Safer Coasts**  

## 📌 Overview  
The **Coastal Threat Alert System (CTAS)** is an IoT + AI powered solution designed to monitor **tides, pollution, and temperature** along Gujarat’s coastline.  
It provides:  
- A **dashboard** with real-time 24-hour forecasts  
- **Automatic SMS alerts** when thresholds are exceeded  
- **Predictive warnings** for upcoming risks  

This project was developed as a **hackathon prototype** to showcase how technology can help in **disaster preparedness and community safety**.  

---

## 🚨 Motivation  
- Rising **sea levels & tides** are threatening coastal communities.  
- Increasing **pollution** and **temperature extremes** affect health, fisheries, and tourism.  
- Existing systems lack **real-time automated alerts** for local communities.  

**CTAS bridges this gap** with an early warning system powered by APIs, IoT concepts, and AI-based analysis.  

---

## 🛠️ Tech Stack  

### **Frontend (Dashboard)**  
- React.js  
- Chart.js (data visualization)  
- Leaflet.js (interactive map)  

### **Backend**  
- Node.js + Express  
- Scheduler (node-cron) for periodic data fetch & alert checks  
- Twilio (SMS alerts)  

### **APIs Used**  
- 🌊 [WorldTides API](https://www.worldtides.info/) → Tide forecast  
- 🌡️ [OpenWeather API](https://openweathermap.org/) → Weather forecast  
- 🌫️ [OpenWeather Pollution API](https://openweathermap.org/api/air-pollution) → PM2.5 levels  

---

## 📊 Features  
✅ Real-time **24-hour forecast** for tides, pollution & temperature  
✅ **Alerts panel** on dashboard with warning levels  
✅ **SMS alerts** to verified phone numbers when thresholds are exceeded  
✅ **Predictive alerts** (detects risks in the next 24h)  
✅ Location-based monitoring for **Porbandar, Veraval, Jamnagar, Bhavnagar, Dwarka**  

---

## ⚙️ Setup Instructions  

### 1️⃣ Clone Repository  
```bash
git clone https://github.com/<your-username>/Coastal_Threat_Alert_System.git
cd Coastal_Threat_Alert_System
```

### 2️⃣ Backend Setup  
```bash
cd backend
npm install
```

Create a **.env** file in `/backend` with:  
```
PORT=5000
OPENWEATHER_KEY=your_openweather_api_key
WORLDTIDES_KEY=your_worldtides_api_key

# Twilio Config
TWILIO_SID=your_twilio_account_sid
TWILIO_AUTH=your_twilio_auth_token
TWILIO_PHONE=your_twilio_registered_number
ALERT_PHONE=verified_receiver_number

# Thresholds (customizable)
TIDE_THRESHOLD=1.2
POLLUTION_THRESHOLD=80
TEMP_THRESHOLD=32
```

Run backend:  
```bash
node server.js
```

### 3️⃣ Frontend Setup  
```bash
cd frontend
npm install
npm start
```

---

## 📱 Demo Flow  
1. Select a **coastal location** from dropdown.  
2. View **real-time tide, pollution & temperature charts**.  
3. If thresholds exceeded → **Dashboard alert triggered**.  
4. **SMS sent** to registered phone number.  

---

## 📌 Future Scope  
- ML-based **predictive models** for longer-term forecasts  
- Integration with **government disaster systems**  
- Deployment of **IoT sensors** for live water quality & erosion tracking  
- Multi-channel alerts (WhatsApp, Telegram, Email)  

---

## 👥 Team  
- **Priyansh Soneji**   
- **Shivani Choudhary**
- **Saumya Tinna**
- **Naisargi Chaudhari**  
