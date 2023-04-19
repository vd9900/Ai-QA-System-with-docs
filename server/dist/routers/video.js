"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoController_1 = require("../controller/videoController");
const router = express_1.default.Router();
router.route("/").post(videoController_1.addVideo);
router.route("/chat").get(videoController_1.getVideo);
exports.default = router;
