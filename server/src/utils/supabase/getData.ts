import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
import dotenv, { config } from "dotenv";

dotenv.config();
console.log("first", process.env.OPENAI_KEY);
console.log(process.env.OPENAI_KEY);
const OPENAI_KEY = process.env.OPENAI_KEY || "";
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const client = createClient(supabaseUrl, supabaseKey);

export const query = async (query: any) => {
  try {
    const model = new OpenAI(
      {
        modelName: "gpt-3.5-turbo",
        openAIApiKey: OPENAI_KEY,
      },
      { organization: process.env.ORGANIZATION_KEY }
    );

    // console.log(client)
    const vectorStore = await SupabaseVectorStore.fromExistingIndex(
      new OpenAIEmbeddings(
        { openAIApiKey: OPENAI_KEY },
        { organization: process.env.ORGANIZATION_KEY }
      ),
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

    return res;
  } catch (error) {
    console.log(error);
  }
};
