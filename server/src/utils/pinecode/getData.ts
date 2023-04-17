import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";

const OPENAI_KEY = "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";
const supabaseUrl = "https://ymfctowwmntpliobhwff.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltZmN0b3d3bW50cGxpb2Jod2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1NzIwODMsImV4cCI6MTk5NzE0ODA4M30.XVCZTsro5wV-GyF-OVLVCbWx1Ne-Qb6QK6S6dqmU9Vw";
const client = createClient(supabaseUrl, supabaseKey);

export const query = async (query: any) => {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: OPENAI_KEY,
  });

  // console.log(client)
  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({ openAIApiKey: OPENAI_KEY }),
    {
      client,
      tableName: "documents",
      queryName: "match_documents",
    }
  );

  /* Create the chain */
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );

  const res = await chain.call({ question: query, chat_history: [] });

  // /* Ask it a follow up question */
  // const chatHistory = query + res.text;
  // const followUpRes = await chain.call({
  //     question: "How was the char on the pizza?",
  //     chat_history: chatHistory,
  // });
  return res;
};
