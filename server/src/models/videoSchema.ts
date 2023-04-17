import mongoose from "mongoose";

// Define video schema
const videoSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    transcript: { type: String },
  });


export default videoSchema
