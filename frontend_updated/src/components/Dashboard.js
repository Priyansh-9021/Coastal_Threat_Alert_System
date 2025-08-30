import React from "react";
import ChartCard from "./ChartCard";
import Map from "./Map";

function Dashboard({ data = {}, alerts = [] }) {
  const { tideForecast = [], weatherForecast = [], pollutionForecast = [] } = data;

  const dotClassFor = (type) => {
    if (!type) return "dot-tide";
    const t = String(type).toLowerCase();
    if (t.includes("pollution")) return "dot-pollution";
    if (t.includes("tide")) return "dot-tide";
    return "dot-weather";
  };

  return (
    <div>
      <div className="App-header">
        <h1>Coastal Threat Alert System — Next 24 Hours</h1>
      </div>

      <div className="dashboard-grid">
        <div className="left-column">
          <div className="charts-row">
            <div className="chart-card">
              <ChartCard
                title="Tide (m) — Next 24h"
                series={tideForecast}
                field="height"
              />
            </div>
            <div className="chart-card">
              <ChartCard
                title="PM2.5 (µg/m³) — Next 24h"
                series={pollutionForecast}
                field="pm2_5"
                color="#b22222"
              />
            </div>
            <div className="chart-card">
              <ChartCard
                title="Temperature (°C) — Next 24h"
                series={weatherForecast}
                field="temp"
                color="#e67e22"
              />
            </div>
          </div>

          <div className="alerts-panel">
            <h3>Upcoming Alerts (Forecast)</h3>
            <ul className="alerts-list">
              {alerts && alerts.length > 0 ? (
                alerts.map((a, i) => (
                  <li key={i}>
                    <span className={`alert-dot ${dotClassFor(a.type)}`} />
                    <div>
                      <span className="alert-label">{a.type}:</span>
                      <span>{a.message}</span>
                      {a.time ? (
                        <span style={{ marginLeft: 8, color: "#666", fontSize: 12 }}>
                          ({new Date(a.time).toLocaleString()})
                        </span>
                      ) : null}
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <span className="alert-dot dot-tide" style={{ visibility: "hidden" }} />
                  <span>No predicted exceedances in next 24h</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="right-column">
          <Map location={data.location || { lat: 21.6417, lng: 69.6293 }} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
