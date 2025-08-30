import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import { coastalLocations } from "./config/locations";
import "./App.css";

function App() {
  const [selectedLocation, setSelectedLocation] = useState("Porbandar");
  const [data, setData] = useState({
    tideForecast: [],
    weatherForecast: [],
    pollutionForecast: [],
    location: coastalLocations.find((l) => l.name === selectedLocation),
  });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const base = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        const res = await fetch(`${base}/api/data/${selectedLocation}`);
        const json = await res.json();
        setData({
          tideForecast: json.tideForecast || [],
          weatherForecast: json.weatherForecast || [],
          pollutionForecast: json.pollutionForecast || [],
          location:
            coastalLocations.find((l) => l.name === selectedLocation) ||
            { name: selectedLocation, lat: 21.6417, lng: 69.6293 },
        });
        setAlerts(json.upcomingAlerts || []);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
    const id = setInterval(fetchData, 10 * 60 * 1000); // refresh every 10 min
    return () => clearInterval(id);
  }, [selectedLocation]);

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        >
          {coastalLocations.map((loc) => (
            <option key={loc.name} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <Dashboard data={data} alerts={alerts} />
    </div>
  );
}

export default App;
