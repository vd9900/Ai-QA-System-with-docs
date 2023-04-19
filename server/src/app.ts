import express, { Request, Response } from "express";
const app = express();
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

dotenv.config({ path: "./config/config.env" });
app.use(cors());
import videoRoute from "./routers/video";

app.use("/api/v1", videoRoute);

app.use(express.static(path.join(__dirname, "../view")));
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../view", "index.html"));
});

export default app;
