import mongoose, { Model, Document } from "mongoose";

export interface Text extends Document {
  transcript: string;
}

const videoSchema = new mongoose.Schema({
  transcript: { type: String, required: true },
});

export const videoModel: Model<Text> = mongoose.model<Text>(
  "data",
  videoSchema
);
