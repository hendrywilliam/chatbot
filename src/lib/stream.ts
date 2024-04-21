import type { ChatCompletionChunk } from "openai/resources/index.mjs";

/** Generate artificial stream */
export function createFakeStream(
  generator: AsyncGenerator,
  signal: AbortSignal,
): ReadableStream {
  return new ReadableStream({
    async start(controller) {
      signal.addEventListener("abort", () => {
        console.log("Request aborted.");
      });
    },
    async pull(controller) {
      const { value, done } = await generator.next();
      if (done || signal.aborted) {
        controller.close();
        return;
      } else {
        controller.enqueue(value);
      }
    },
    async cancel(reason) {},
  });
}

export async function* chatCompletionGenerator(
  snapshots: ChatCompletionChunk[],
  timeout: number = 100,
) {
  for await (const snapshot of snapshots) {
    yield new Promise((resolve, reject) =>
      /** Add timeout so it looks like it needs time to generate a result. */
      setTimeout(() => {
        resolve(`${JSON.stringify(snapshot)}\n`);
      }, timeout),
    );
  }
}

export const experimental_chatCompletionGenerator = async function* (
  snapshots: ChatCompletionChunk[],
  timeout: number = 200,
) {
  for await (const snapshot of snapshots) {
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(JSON.stringify(snapshot));
      }, timeout);
    });
  }
};

/** Piping operation between two stream: Readable and Transform. */
export const experimental_compositeStream = function (
  generator: AsyncGenerator,
): ReadableStream {
  const queueStrat = new CountQueuingStrategy({
    highWaterMark: 5,
  });

  const readableStream = new ReadableStream(
    {
      async start(controller) {
        console.log("ReadableStream initialized.");
      },
      async pull(controller) {
        const { value, done } = await generator.next();
        if (done) {
          controller.close();
          return;
        }
        controller.enqueue(value);
      },
      cancel(reason) {
        console.log("Stream canceled. Reason: ", reason);
      },
    },
    queueStrat,
  );

  const transformStream = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(`${chunk}\n`);
    },
    flush(controller) {
      controller.terminate();
    },
  });

  return readableStream.pipeThrough(transformStream);
};

/** @param generator is an object that applies iterator protocol. */
export const experimental_StreamingResponse = function (
  generator: AsyncGenerator,
  signal: AbortSignal,
  transformer?: () => void,
) {
  return new Response(
    new ReadableStream({
      async start() {
        signal.addEventListener("abort", () => {
          console.log("User has aborted the current request.");
        });
      },
      async pull(controller) {
        const { value, done } = await generator.next();
        if (done || signal.aborted) {
          controller.close();
          return;
        }
        /**
         * @todo We should get the answer only, not including the context and history.
         * In this workaround we are accessing answer property, which only exist in answer response.
         * Accessing "answer" property in an object that has no corresponding property will return undefined.
         */
        const answer = (value as any).answer ?? "";
        controller.enqueue(`{ "answer":${JSON.stringify(answer)} }\n`);
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      },
      status: 200,
      statusText: "Streaming data in chunks.",
    },
  );
};
