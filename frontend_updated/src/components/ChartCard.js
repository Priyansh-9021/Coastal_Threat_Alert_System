import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

/**
 * Props:
 *  - title: string
 *  - series: array of { time: ISOString, <field>: number }
 *  - field: key in series to graph (e.g., "height", "temp", "pm2_5")
 *  - color: optional line color
 */
const ChartCard = ({ title, series = [], field = "value", color = "#0074d9" }) => {
  const labels = series.map((s) =>
    new Date(s.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const values = series.map((s) => {
    const v = s?.[field];
    return typeof v === "number" ? v : null;
    });

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        borderColor: color,
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { type: "category" },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="chart-card" style={{ height: 240 }}>
      <h4 style={{ margin: "4px 0 8px 0" }}>{title}</h4>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartCard;
