import { describe, expect, test } from "@jest/globals";
import { chatCompletionGenerator } from "@/lib/stream";
import { chatCompletionSnapshots } from "@/lib/snapshots/chat-completion";
import { ChatCompletionChunk } from "openai/resources/index.mjs";

describe("chatCompletionGenerator function", () => {
  test("It should generate value based on the snapshot given.", async () => {
    let result = "";
    const fakeStreams = chatCompletionGenerator(chatCompletionSnapshots, 0);
    for await (let value of fakeStreams) {
      result += (JSON.parse(value as string) as ChatCompletionChunk).choices[0]
        .delta["content"];
    }
    expect(result).toBe("Rachel is a cutie patotie.");
  });
});
