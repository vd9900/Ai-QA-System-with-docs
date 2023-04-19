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
exports.textSpilt = void 0;
const text_splitter_1 = require("langchain/text_splitter");
const videoSchema_1 = require("../../models/videoSchema");
const textSpilt = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield videoSchema_1.videoModel.find();
    const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 0,
    });
    const docOutput = yield splitter.createDocuments([result[0].transcript]);
    return docOutput;
});
exports.textSpilt = textSpilt;
