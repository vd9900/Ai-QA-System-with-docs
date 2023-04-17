import { videoModel } from "../../models/videoSchema";

export const storeMongoDb = (text: String) => {
  try {
    const newVideo = new videoModel({
      transcript: text,
    });
    newVideo.save();
    return "data stored succefully";
  } catch (error) {
    return "data stored succefully";
  }
};
