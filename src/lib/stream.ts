import type { ChatCompletionChunk } from "openai/resources/index.mjs";

/** Generate artificial stream */
export function createFakeStream(
  iterator: AsyncGenerator,
  signal: AbortSignal
): ReadableStream {
  return new ReadableStream({
    async start(controller) {},
    async pull(controller) {
      while (true) {
        /** Server should respect aborts from client. It changes signal.aborted state to true. */
        signal.addEventListener("abort", () => {
          console.log("Request aborted.");
        });

        const { value, done } = await iterator.next();
        if (done || signal.aborted) {
          controller.close();
          break;
        } else {
          controller.enqueue(value);
        }
      }
    },
    async cancel(reason) {},
  });
}

export async function* chatCompletionGenerator(
  snapshots: ChatCompletionChunk[],
  timeout: number = 100
) {
  for await (const snapshot of snapshots) {
    yield new Promise((resolve, reject) =>
      /** Add timeout so it looks like it needs time to generate a result. */
      setTimeout(() => {
        resolve(`${JSON.stringify(snapshot)}\n`);
      }, timeout)
    );
  }
}
