"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({ path: "./config/config.env" });
app.use((0, cors_1.default)());
const video_1 = __importDefault(require("./routers/video"));
app.use("/api/v1", video_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../view")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../view", "index.html"));
});
exports.default = app;
