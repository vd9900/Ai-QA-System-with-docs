import express, { Request, Response } from "express";
const app = express();
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: "./config/config.env" });

import videoRoute from "./routers/video";

app.use("/api/v1", videoRoute);

app.use(express.static(path.join(__dirname, "../../client/build")));
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

export default app;
