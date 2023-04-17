"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const openai_1 = require("langchain/llms/openai");
const chains_1 = require("langchain/chains");
const supabase_1 = require("langchain/vectorstores/supabase");
const openai_2 = require("langchain/embeddings/openai");
const supabase_js_1 = require("@supabase/supabase-js");
const OPENAI_KEY = "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";
const supabaseUrl = "https://ymfctowwmntpliobhwff.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltZmN0b3d3bW50cGxpb2Jod2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1NzIwODMsImV4cCI6MTk5NzE0ODA4M30.XVCZTsro5wV-GyF-OVLVCbWx1Ne-Qb6QK6S6dqmU9Vw";
const client = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const query = () => __awaiter(void 0, void 0, void 0, function* () {
    const model = new openai_1.OpenAI({
        modelName: "gpt-3.5-turbo",
        openAIApiKey: OPENAI_KEY,
    });
    // console.log(client)
    const vectorStore = yield supabase_1.SupabaseVectorStore.fromExistingIndex(new openai_2.OpenAIEmbeddings({ openAIApiKey: OPENAI_KEY }), {
        client,
        tableName: "documents",
        queryName: "match_documents",
    });
    /* Create the chain */
    const chain = chains_1.ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
    const query = "who is the real parents of Aurora?";
    const res = yield chain.call({ question: query, chat_history: [] });
    // /* Ask it a follow up question */
    // const chatHistory = query + res.text;
    // const followUpRes = await chain.call({
    //     question: "How was the char on the pizza?",
    //     chat_history: chatHistory,
    // });
    return res;
});
exports.query = query;
