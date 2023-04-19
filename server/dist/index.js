"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
(0, dbConnect_1.default)();
app_1.default.listen(process.env.PORT, () => {
    console.log(`server running  ${process.env.PORT}`);
});
