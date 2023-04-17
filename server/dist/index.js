"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
if (process.env.ENV !== "PROD") {
    dotenv_1.default.config({ path: "../server/config.env" });
}
(0, dbConnect_1.default)();
app_1.default.listen(process.env.PORT, () => {
    console.log(`server running  ${process.env.PORT}`);
});
