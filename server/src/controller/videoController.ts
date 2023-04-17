import { Request, Response } from "express";
// import { convertToAudio } from "../utils/convertVideoToText";
import { textSpilt } from "../utils/langchain/splitText";
import { convertText } from "../utils/openAi/Text";
import { store } from "../utils/pinecode/store";
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import { query } from "../utils/pinecode/getData";

export const addVideo = async (req: Request, res: Response) => {
  // const adio = await convertToAudio(
  //   "https://www.youtube.com/watch?v=iuk77TjvfmE"
  // );
  const text = await textSpilt();
  const data = await store(text);
  res.json(data);
};

export const getVideo = async (req: Request, res: Response) => {
  const newQuery = req.query?.query;
  const respone = await query(newQuery);
  res.json(respone);
};
