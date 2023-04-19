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
const splitText_1 = require("../utils/langchain/splitText");
const Text_1 = require("../utils/openAi/Text");
const store_1 = require("../utils/supabase/store");
const getData_1 = require("../utils/supabase/getData");
const convertVideoToText_1 = require("../utils/ytdl-core/convertVideoToText");
const store_2 = require("../utils/mongodb/store");
const addVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, convertVideoToText_1.convertToAudio)("https://www.youtube.com/watch?v=rtoZT94Wjqs");
    const text = yield (0, Text_1.convertText)();
    const result = (0, store_2.storeMongoDb)(text);
    const splitedText = yield (0, splitText_1.textSpilt)();
    const data = yield (0, store_1.store)(splitedText);
    res.json(splitedText);
});
exports.addVideo = addVideo;
const getVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newQuery = (_a = req.query) === null || _a === void 0 ? void 0 : _a.query;
        console.log("rtdt", newQuery);
        const respone = yield (0, getData_1.query)(newQuery);
        if (!respone)
            return res.status(500).json("something went wrong");
        res.status(200).json(respone);
    }
    catch (error) {
        res.status(500).json("something went wrong");
    }
});
exports.getVideo = getVideo;
