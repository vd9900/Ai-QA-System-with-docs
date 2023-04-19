"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeMongoDb = void 0;
const videoSchema_1 = require("../../models/videoSchema");
const storeMongoDb = (text) => {
    try {
        const newVideo = new videoSchema_1.videoModel({
            transcript: text,
        });
        newVideo.save();
        return "data stored succefully";
    }
    catch (error) {
        return "data stored succefully";
    }
};
exports.storeMongoDb = storeMongoDb;
