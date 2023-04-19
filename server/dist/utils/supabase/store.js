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
exports.store = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_1 = require("langchain/vectorstores/supabase");
const openai_1 = require("langchain/embeddings/openai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const store = (docs) => __awaiter(void 0, void 0, void 0, function* () {
    // const texts = ["Hello world", "Bye bye", "What's this?"];
    try {
        // const texts = docs.map((i: any) => i.pageContent);
        const vectorStore = yield supabase_1.SupabaseVectorStore.fromDocuments(docs, new openai_1.OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_KEY }), {
            client: (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey),
            tableName: "documents",
        } // assert that the object conforms to SupabaseLibArgs type
        );
        const resultOne = yield vectorStore.similaritySearch("She asked William to help her");
        console.log(resultOne);
        return resultOne;
    }
    catch (error) { }
});
exports.store = store;
