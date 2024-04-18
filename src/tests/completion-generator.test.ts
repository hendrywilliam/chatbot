import { describe, expect, test } from "@jest/globals";
import { chatCompletionGenerator } from "@/lib/stream";
import { chatCompletionSnapshots } from "@/lib/snapshots/chat-completion";
import { ChatCompletionChunk } from "openai/resources/index.mjs";

describe("chatCompletionGenerator function test", () => {
  test("it should generate correct value based on the snapshot given.", async () => {
    let accumulatedText = "";
    const results = chatCompletionGenerator(chatCompletionSnapshots, 0);
    for await (let result of results) {
      const parsed: ChatCompletionChunk = JSON.parse(result as string);
      accumulatedText += parsed.choices[0].delta.content ?? "";
    }
    expect(accumulatedText).toBe("Rachel is a cutie patootie.");
  });
});
