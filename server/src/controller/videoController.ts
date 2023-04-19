import { Request, Response } from "express";
import { textSpilt } from "../utils/langchain/splitText";
import { convertText } from "../utils/openAi/Text";
import { store } from "../utils/supabase/store";
import { query } from "../utils/supabase/getData";
import { convertToAudio } from "../utils/ytdl-core/convertVideoToText";
import { storeMongoDb } from "../utils/mongodb/store";

export const addVideo = async (req: Request, res: Response) => {
  await convertToAudio("https://www.youtube.com/watch?v=rtoZT94Wjqs");
  const text = await convertText();
  const result = storeMongoDb(text);
  const splitedText = await textSpilt();
  const data = await store(splitedText);
  res.json(splitedText);
};

export const getVideo = async (req: Request, res: Response) => {
  try {
    const newQuery = req.query?.query;
    console.log("rtdt", newQuery);
    const respone = await query(newQuery);
    if (!respone) return res.status(500).json("something went wrong");
    res.status(200).json(respone);
  } catch (error) {
    res.status(500).json("something went wrong");
  }
};
