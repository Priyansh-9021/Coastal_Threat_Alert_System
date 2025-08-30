// check-keys.mjs
import dotenv from "dotenv";
dotenv.config();
console.log("OPENWEATHER_KEY =", process.env.OPENWEATHER_KEY ? "SET" : "MISSING");
console.log("WORLDTIDES_KEY  =", process.env.WORLDTIDES_KEY ? "SET" : "MISSING");
