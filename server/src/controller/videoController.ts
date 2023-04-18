import { Request, Response } from "express";
import { textSpilt } from "../utils/langchain/splitText";
import { convertText } from "../utils/openAi/Text";
import { store } from "../utils/supabase/store";
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import { query } from "../utils/supabase/getData";
import { convertToAudio } from "utils/ytdl-core/convertVideoToText";
import { storeMongoDb } from "utils/mongodb/store";

export const addVideo = async (req: Request, res: Response) => {
  await convertToAudio("https://www.youtube.com/watch?v=iuk77TjvfmE");
  const text = await convertText();
  await storeMongoDb(text);
  const splitedText = await textSpilt();
  const data = await store(splitedText);
  res.json(data);
};

export const getVideo = async (req: Request, res: Response) => {
  const newQuery = req.query?.query;
  const respone = await query(newQuery);
  res.json(respone);
};
