// routes/dataRoutes.js
import { Router } from "express";
import { getDataForLocation } from "../controllers/dataController.js";

const router = Router();

// Returns next-24h forecast arrays for a location
router.get("/:location", getDataForLocation);

export default router;
