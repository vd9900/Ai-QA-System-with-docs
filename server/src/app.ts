import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import videoRoute from "./routers/video";

app.use("/api/v1", videoRoute);

export default app;
