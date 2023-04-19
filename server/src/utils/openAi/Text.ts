import fs from "fs";



import { Configuration, OpenAIApi } from "openai";
import { AxiosResponse } from "axios";
export const convertText = async (): Promise<string> => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
  });
  const file = fs.createReadStream("../server/assets/audio.mp3");
  const openai = new OpenAIApi(configuration);
  const resp: any = await openai.createTranslation(file, "whisper-1");
  return resp.data.text;
};
