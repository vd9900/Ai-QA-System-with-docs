import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { Text, videoModel } from "../../models/videoSchema";
export const textSpilt = async (): Promise<Document[]> => {
  const result: Text[] = await videoModel.find();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 0,
  });

  const docOutput = await splitter.createDocuments([result[0].transcript]);
  return docOutput;
};
