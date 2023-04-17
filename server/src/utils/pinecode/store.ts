import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  SupabaseVectorStore,
  SupabaseLibArgs,
} from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import dotenv from "dotenv";

const OPENAI_KEY = "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";
const supabaseUrl = "https://ymfctowwmntpliobhwff.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltZmN0b3d3bW50cGxpb2Jod2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1NzIwODMsImV4cCI6MTk5NzE0ODA4M30.XVCZTsro5wV-GyF-OVLVCbWx1Ne-Qb6QK6S6dqmU9Vw";
export const store = async (docs: any) => {
  // const texts = ["Hello world", "Bye bye", "What's this?"];
  const texts = docs.map((i: any) => i.pageContent);
  const vectorStore = await SupabaseVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey: OPENAI_KEY }),
    {
      client: createClient(supabaseUrl, supabaseKey) as SupabaseClient,
      tableName: "documents",
    } as SupabaseLibArgs // assert that the object conforms to SupabaseLibArgs type
  );

  const resultOne = await vectorStore.similaritySearch(
    "She asked William to help her"
  );

  console.log(resultOne);
  return resultOne;
};
