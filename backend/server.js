import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataRoutes from "./routes/dataRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import { startScheduler } from "./utils/scheduler.js";



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/data", dataRoutes);
app.use("/api/test", testRoutes);

startScheduler();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
