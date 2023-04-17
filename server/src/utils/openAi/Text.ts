import FormData from "form-data";
import axios from "axios";
import fs from "fs";
import path from "path";

const model = "whisper-1";

export const convertText = async () => {
  const filePath = path.join(__dirname, "../../assets/audio.mp3");
  const newFormData = new FormData();
  newFormData.append("model", model);
  newFormData.append("file", fs.createReadStream(filePath));
  console.log("api key", process.env.OPENAI_KEY);
  const { data } = await axios.post(
    "https://api.openai.com/v1/audio/transcriptions",
    newFormData,
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
    }
  );

  return data;
};
