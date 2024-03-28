import type { ChatCompletionChunk } from "openai/resources/index.mjs";

/** Generate artificial stream */
export function createFakeStream(
  iterator: AsyncGenerator,
  signal?: AbortSignal
): ReadableStream {
  return new ReadableStream({
    async start(controller) {},
    async pull(controller) {
      while (true) {
        /** Close fake stream when the signal return true.s */
        if (signal && signal?.aborted) {
          controller.close();
        }

        const { value, done } = await iterator.next();
        if (done) {
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
