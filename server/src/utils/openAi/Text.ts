
import fs from "fs";

interface Translation {
  text: String;
}

import { Configuration, OpenAIApi } from "openai";
import { AxiosResponse } from "axios";
export const convertText = async (): Promise<string> => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const resp:any = await openai.createTranslation(
    fs.createReadStream("../server/assets/audio.mp3"),
    "whisper-1"
  );
  return resp.data.text;
};
