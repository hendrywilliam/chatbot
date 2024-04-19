import { Message } from "@/types";
import { chatModel } from "@/lib/open-ai";
import { vectorStore } from "@/lib/vector-store";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { generateChatHistory, getEntriesFormData } from "@/lib/utils";
import { experimental_StreamingResponse } from "@/lib/stream";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

export async function POST(request: Request) {
  const formData = await request.formData();
  const { prompt: userPrompt, messages } = getEntriesFormData<{
    prompt: string;
    messages: string;
  }>(formData);

  const retriever = vectorStore.asRetriever();

  const historyAwarePrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"],
    [
      "user",
      "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
    ],
  ]);

  const historyAwareRetrieverChain = await createHistoryAwareRetriever({
    llm: chatModel,
    retriever,
    rephrasePrompt: historyAwarePrompt,
  });

  const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Answer the user's questions based on the below context:\n\n{context}",
    ],
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"],
  ]);

  const documentChain = await createStuffDocumentsChain({
    llm: chatModel,
    prompt: historyAwareRetrievalPrompt,
  });

  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever: historyAwareRetrieverChain,
  });

  const parsedHistory = JSON.parse(messages) as Message[];
  const result = await retrievalChain.stream({
    input: userPrompt,
    chat_history: generateChatHistory(parsedHistory),
  });

  return experimental_StreamingResponse(result);
}
