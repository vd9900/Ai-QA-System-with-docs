import "langchain/vectorstores/supabase";
import { VectorStore } from "../../node_modules/langchain/dist/vectorstores";

declare class SupabaseVectorStore extends VectorStore {
  static fromTexts(
    texts: string[],
    embeddings: Embeddings,
    dbConfig: SupabaseLibArgs
  ): Promise<SupabaseVectorStore>;
}
