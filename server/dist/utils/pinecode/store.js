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
exports.store = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_1 = require("langchain/vectorstores/supabase");
const openai_1 = require("langchain/embeddings/openai");
const OPENAI_KEY = "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";
const supabaseUrl = "https://ymfctowwmntpliobhwff.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltZmN0b3d3bW50cGxpb2Jod2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1NzIwODMsImV4cCI6MTk5NzE0ODA4M30.XVCZTsro5wV-GyF-OVLVCbWx1Ne-Qb6QK6S6dqmU9Vw";
const store = (docs) => __awaiter(void 0, void 0, void 0, function* () {
    // const texts = ["Hello world", "Bye bye", "What's this?"];
    const texts = docs.map((i) => i.pageContent);
    const vectorStore = yield supabase_1.SupabaseVectorStore.fromDocuments(docs, new openai_1.OpenAIEmbeddings({ openAIApiKey: OPENAI_KEY }), {
        client: (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey),
        tableName: "documents",
    } // assert that the object conforms to SupabaseLibArgs type
    );
    const resultOne = yield vectorStore.similaritySearch("She asked William to help her");
    console.log(resultOne);
    return resultOne;
});
exports.store = store;
