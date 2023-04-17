"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define video schema
const videoSchema = new mongoose_1.default.Schema({
    videoId: { type: String, required: true },
    transcript: { type: String },
});
exports.default = videoSchema;
