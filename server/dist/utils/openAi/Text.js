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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertText = void 0;
const form_data_1 = __importDefault(require("form-data"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const model = "whisper-1";
const convertText = () => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(__dirname, "../../assets/audio.mp3");
    const newFormData = new form_data_1.default();
    newFormData.append("model", model);
    newFormData.append("file", fs_1.default.createReadStream(filePath));
    console.log("api key", process.env.OPENAI_KEY);
    const { data } = yield axios_1.default.post("https://api.openai.com/v1/audio/transcriptions", newFormData, {
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_KEY}`,
        },
    });
    return data;
});
exports.convertText = convertText;
