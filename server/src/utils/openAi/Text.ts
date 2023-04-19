import fs from "fs";
import fetch from "fetch-blob";
import { Configuration, OpenAIApi } from "openai";

export const convertText = async (): Promise<string> => {
  // const configuration = new Configuration({
  //   apiKey: process.env.OPENAI_KEY,
  // });
  // const newFecth = new fetch();
  // const fileStream = fs.createReadStream("../server/assets/audio.mp3");
  // const response = await newFecth(fileStream);
  // const blob = await response.blob();
  // const file = new File([blob], "audio.mp3", { type: blob.type });

  // const openai = new OpenAIApi(configuration);
  // const resp: any = await openai.createTranslation(file, "whisper-1");

  return" resp.data.text";
};
