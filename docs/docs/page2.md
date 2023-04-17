# Guide for Developers

## Setup

### **Overview**

This project involves converting YouTube videos to audio and then converting the audio to text. The text is then embedded using OpenAI's Embedding API and stored in a Supabase Vector database. The user can then query the database with a question and receive an answer from the database using Supabase's query functionality. Additionally, a Conversational Retrieval QA Chain is implemented using ChatGPT to provide more in-depth answers based on the user's previous questions. Here's a breakdown of the steps involved:

1. Convert YouTube video to audio using ytdl-core library
2. Convert each audio chunk to text using OpenAI's Whisper-1 API
3. Store the text in a MongoDb database
4. Split the text into smaller chunks using LangChain RecursiveSplitter
5. Embed the text using OpenAI's Embedding API and store in a Supabase Vector database
6. Query the Supabase Vector database using user input
7. Use ChatGPT's Conversational Retrieval QA Chain to provide more in-depth answers based on the user's previous questions.

By following these steps, users can obtain more detailed answers to their queries and have a richer experience with the system.

### **Prerequisites**

Before you can set up a question and answer system using OpenAI embeddings and Supabase vector database, you will need to have the following prerequisites:

1.  **MERN Stack**: You will need to have a working knowledge of the MERN (MongoDB, Express, React, Node.js) stack, as this is the technology stack used in the tutorial. This includes experience with React.js for building user interfaces, Node.js for server-side development, and MongoDB for database management.

2.  **OpenAI API Key and Language Model**: You will need an OpenAI API key and access to one of their language models, such as GPT-3. These APIs allow you to generate embeddings for text data, which are then stored and queried using Supabase vector database.

3.  **Supabase Vector Database**: You will need access to a Supabase vector database instance, which allows you to store and query high-dimensional vector data. Supabase provides an easy-to-use interface for managing your database and integrates seamlessly with the MERN stack.

In order to follow along with the tutorial and build your own question and answer system, you will need to have a working knowledge of these technologies and have access to the necessary resources. If you are unfamiliar with any of these technologies, we recommend that you spend some time learning them before attempting to build the question and answer system. Additionally, make sure that you have set up the necessary accounts and credentials before starting the tutorial.

### **Installtion**

#### Front-end

Create CloseAi floder and install React app with `Typescirpt` using `npm` or `yarn` and for styling `Material UI` other dependencies packages

```
npm i create-react-app client --template typescript
```

```
npm i @emotion/react @emotion/styled @material-ui/core @mui/icons-material @mui/material axios tss-react
```

#### Back-end

First create `server` folder and initialize with typescript and Install the below dependencies

```
npm i  langchain Express mongoose  @supabase/supabase-js   axios  form-data
```

Dev dependencies

```
npm i --save-dev nodemon @types/express @types/dotenv typescript ts-node
```

Make sure to setup typescript in your node js app. Use this article to config [here](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript) or copy from gihub [repo](https://github.com/vd9900/Ai-QA-System-with-docs/tree/master/server).

## Convert Youtube to Audio

This project provides a function to convert a YouTube video to an audio file using ytdl-core and fs libraries.

### Code Explanation

- The ytdl function from ytdl-core library is used to fetch the YouTube video as a readable stream.
- A filter is applied to the formats available in the video to ensure that the chosen format has audio and is in the MP4 container.
- The pipe function is used to write the video stream to an output file as a writable stream using the `fs.createWriteStream` function.
- The on function is used to listen for the events 'finish' and 'error'. If the stream finishes without errors, the promise is resolved with the path of the output file. If an error occurs, the promise is rejected with the error object.

```
import ytdl from "ytdl-core";
import fs from "fs";

interface VideoFormat {
  audioBitrate?: number;
  container?: string;
}

export const convertToAudio = (videoUrl: string): Promise<string> => {
  const outputPath = "audio.mp3";
  return new Promise((resolve, reject) => {
    ytdl(videoUrl, {
      filter: (format: VideoFormat): boolean =>
        !!format.audioBitrate && format.container === "mp4",
      quality: "highestaudio",
    })
      .on("error", (err: Error) => {
        reject(err);
      })
      .pipe(fs.createWriteStream(outputPath))
      .on("finish", () => {
        resolve(outputPath);
      })
      .on("error", (err: Error) => {
        reject(err);
      });
  });
};


```

## Audio to Text Converter

This project provides a function to convert an audio file to text using OpenAI's Whisper-1 API.

### Code Explanation

- The function uses the path and fs libraries to read the audio file from the file system and create a new `FormData` object.
- The FormData object is populated with the model and file fields. The model field specifies the OpenAI - API model to use for transcription, while the file field contains the audio file as a stream.
- An axios request is made to the OpenAI API with the FormData object as the request body and the Authorization header set with the `OPENAI_KEY` environment variable.
- The function returns a promise that resolves with the transcribed text from the OpenAI API.

```
import FormData from "form-data";
import axios from "axios";
import fs from "fs";
import path from "path";

const model = "whisper-1";

export const convertText = async () => {
  const filePath = path.join(__dirname, "../../assets/audio.mp3");
  const newFormData = new FormData();
  newFormData.append("model", model);
  newFormData.append("file", fs.createReadStream(filePath));
  console.log("api key", process.env.OPENAI_KEY);
  const { data } = await axios.post(
    "https://api.openai.com/v1/audio/transcriptions",
    newFormData,
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
    }
  );

  return data;
};

```

## Store on MongoDB

### Code Explanation

- The code imports the `videoModel` object from the videoSchema module, which is defined in the models directory. This object is a Mongoose model that represents the schema for the videos collection in MongoDB.

- The storeMongoDb function takes a single argument, text, which is a string representing the transcript of a video that has been converted from audio to text using the OpenAI API.
- Within the function, a new instance of the `videoModel` is created and passed an object with a single property, transcript, which is set to the text argument.
- The `save()` method is called on the new instance, which saves the object to the videos collection in the MongoDB database.
- If an error occurs during the saving process, the function returns a string indicating that the data was not stored successfully. Otherwise, it returns a string indicating that the data was stored successfully.

```
import { videoModel } from "../../models/videoSchema";

export const storeMongoDb = (text: String) => {
  try {
    const newVideo = new videoModel({
      transcript: text,
    });
    newVideo.save();
    return "data stored succefully";
  } catch (error) {
    return "data stored succefully";
  }
};

```

This is the Schema file :

```
import mongoose, { Model, Document } from "mongoose";

interface Text extends Document {
  transcript: string;
}

const videoSchema = new mongoose.Schema({
  transcript: { type: String, required: true },
});

export const videoModel: Model<Text> = mongoose.model<Text>("data", videoSchema);

```

## Split the Text

### Code Explanation

- The code imports the RecursiveCharacterTextSplitter and Document classes from the langchain package, and the Text interface and videoModel from a local videoSchema module.
- The textSpilt function is defined with an async keyword, indicating that it will contain asynchronous operations.
- The function retrieves an array of Text documents from the MongoDB database using the find() method on the videoModel instance. The resulting array is assigned to a variable named result.
- A RecursiveCharacterTextSplitter instance is created with a configuration object specifying the size and overlap of text chunks.
- The createDocuments() method of the splitter instance is called with an array containing the transcript property of the first element in the result array. This converts the transcript into an array of Document objects.
- The resulting array of Document objects is returned from the function as a promise.
- Overall, the code retrieves text data from a MongoDB database, splits it into smaller chunks using a text splitter, and returns the resulting chunks as Document objects.

```
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { Text, videoModel } from "models/videoSchema";
export const textSpilt = async (): Promise<Document[]> => {
  const result: Text[] = await videoModel.find();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 0,
  });

  const docOutput = await splitter.createDocuments([result[0].transcript]);
  return docOutput;
};

```

## Embeddings & Store on Supabase

### Code Explanation

- The function first extracts the text content from each document in the input array.
- To get OpenAi Api [here](https://platform.openai.com/account/api-keys) && supabaseurl and supabase secretkey [here](https://supabase.com/docs/guides/api/quickstart)
- It then creates a vector store using the SupabaseVectorStore class from the langchain/vectorstores/supabase module. This vector store will be used to perform similarity searches on the documents based on their embeddings.
- The function initializes the SupabaseVectorStore with the input documents, the OpenAI embeddings object, and a Supabase client and table name to store the vector representations of the documents.
- Finally, the function performs a similarity search on the vector store using the query "She asked William to help her". The result of the similarity search is logged to the console and returned from the function.

```
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  SupabaseVectorStore,
  SupabaseLibArgs,
} from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import dotenv from "dotenv";

const OPENAI_KEY = process.env.OPENAI_KEY;
const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;
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

```

## Query

### Code Explanation

- It imports several modules: OpenAI from `langchain/llms/openai`, `ConversationalRetrievalQAChain` from `langchain/chains`, `SupabaseVectorStore` from `langchain/vectorstores/supabase`, and createClient from `@supabase/supabase-js`.
- It sets the values of `OPENAI_KEY`, `supabaseUrl`, and `supabaseKey` by ( click [here](https://supabase.com/docs/guides/api/quickstart) to get supabaseurl and Supabasekey )accessing the environment variables. To get Api key [click](https://platform.openai.com/account/api-keys)
- It creates a new instance of the OpenAI class using the `gpt-3.5-turbo` model and the `OPENAI_KEY`.
- It creates a `SupabaseVectorStore` object from an existing index named match_documents in a Supabase database table named documents using the createClient function and supabaseUrl and supabaseKey.
- It creates a ConversationalRetrievalQAChain object from the OpenAI instance and the `SupabaseVectorStore` object as the retriever.
- It calls the call method of the `ConversationalRetrievalQAChain` object, passing an object that contains the question and an empty chat_history.
- It returns the result of the call method.

```
import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";

const OPENAI_KEY = process.env.OPENAI_KEY;
const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;
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

  return res;
};

```
