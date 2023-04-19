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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const openai_1 = require("langchain/llms/openai");
const chains_1 = require("langchain/chains");
const supabase_1 = require("langchain/vectorstores/supabase");
const openai_2 = require("langchain/embeddings/openai");
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("first", process.env.OPENAI_KEY);
console.log(process.env.OPENAI_KEY);
const OPENAI_KEY = process.env.OPENAI_KEY || "";
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const client = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const query = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        const res = yield chain.call({ question: query, chat_history: [] });
        return res;
    }
    catch (error) {
        console.log(error);
    }
});
exports.query = query;
