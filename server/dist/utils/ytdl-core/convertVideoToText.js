"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToAudio = void 0;
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const fs_1 = __importDefault(require("fs"));
const convertToAudio = (videoUrl) => {
    const outputPath = "audio.mp3";
    return new Promise((resolve, reject) => {
        (0, ytdl_core_1.default)(videoUrl, {
            filter: (format) => !!format.audioBitrate && format.container === "mp4",
            quality: "highestaudio",
        })
            .on("error", (err) => {
            reject(err);
        })
            .pipe(fs_1.default.createWriteStream(outputPath))
            .on("finish", () => {
            resolve(outputPath);
        })
            .on("error", (err) => {
            reject(err);
        });
    });
};
exports.convertToAudio = convertToAudio;
