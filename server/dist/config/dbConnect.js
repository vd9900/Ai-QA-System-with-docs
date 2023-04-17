"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    mongoose_1.default
        .connect(process.env.DB_URL)
        .then((res) => console.log("Server connected to Database"))
        .catch((err) => console.log(err));
}
exports.default = connectDB;
