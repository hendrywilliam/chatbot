import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { embeddings } from "@/lib/open-ai";
import { chatModel as OpenAIModel } from "@/lib/open-ai";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { getEntriesFormData } from "@/lib/utils";
import { experimental_StreamingResponse } from "@/lib/stream";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function POST(request: Request) {
  const formData = await request.formData();
  const { file, prompt: userPrompt } = getEntriesFormData<{
    file: File;
    prompt: string;
  }>(formData);
  const loader = new PDFLoader(file);

  const data = await loader.load();

  const vectorstore = await MemoryVectorStore.fromDocuments(data, embeddings);
  const retriever = vectorstore.asRetriever();

  const prompt =
    ChatPromptTemplate.fromTemplate(`Answer the following question based only on the provided context:

  <context>
  {context}
  </context>

  Question: {input}
  `);

  const documentChain = await createStuffDocumentsChain({
    llm: OpenAIModel,
    prompt,
    outputParser: new StringOutputParser(),
  });

  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever,
  });

  const result = await retrievalChain.stream({
    input: userPrompt,
  });

  return experimental_StreamingResponse(result);
}
