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
exports.textSpilt = void 0;
const text_splitter_1 = require("langchain/text_splitter");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const textSpilt = () => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(__dirname, "abcd.txt");
    const fileContents = fs_1.default.readFileSync(filePath, "utf8");
    const paragraph = fileContents.replace(/\n/g, " ");
    //   const text = `Hi.I'm Harrison.nHow? Are? You?Okay then f f f f. This is a weird text to write, but gotta test the splittingggg some how.Bye!-H.`;
    const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 0,
    });
    const docOutput = yield splitter.createDocuments([paragraph]);
    return docOutput;
});
exports.textSpilt = textSpilt;
