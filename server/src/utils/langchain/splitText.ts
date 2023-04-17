import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { convertText } from "../openAi/Text";
import { Document } from "langchain/document";
import fs from "fs";
import path from "path";
export const textSpilt = async (): Promise<Document[]> => {
  const filePath = path.join(__dirname, "abcd.txt");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const paragraph = fileContents.replace(/\n/g, " ");
  //   const text = `Hi.I'm Harrison.nHow? Are? You?Okay then f f f f. This is a weird text to write, but gotta test the splittingggg some how.Bye!-H.`;
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 0,
  });

  const docOutput = await splitter.createDocuments([paragraph]);
  return docOutput;
};
