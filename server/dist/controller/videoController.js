"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideo = exports.addVideo = void 0;
// import { convertToAudio } from "../utils/convertVideoToText";
const splitText_1 = require("../utils/langchain/splitText");
const store_1 = require("../utils/pinecode/store");
const getData_1 = require("../utils/pinecode/getData");
const addVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const adio = await convertToAudio(
    //   "https://www.youtube.com/watch?v=iuk77TjvfmE"
    // );
    const text = yield (0, splitText_1.textSpilt)();
    const data = yield (0, store_1.store)(text);
    res.json(data);
});
exports.addVideo = addVideo;
const getVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    const respone = yield (0, getData_1.query)();
    res.json(respone);
});
exports.getVideo = getVideo;
