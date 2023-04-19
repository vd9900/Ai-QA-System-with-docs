import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  SupabaseVectorStore,
  SupabaseLibArgs,
} from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import dotenv from "dotenv";

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
export const store = async (docs: any) => {
  // const texts = ["Hello world", "Bye bye", "What's this?"];
  try {
    // const texts = docs.map((i: any) => i.pageContent);
    const vectorStore = await SupabaseVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_KEY }),
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
  } catch (error) {}
};
