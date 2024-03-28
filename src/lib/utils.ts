import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decode() {
  const decoder = new TextDecoder("utf8");
  return function (chunk: Uint8Array | undefined) {
    if (typeof chunk === "undefined") return;
    return decoder.decode(chunk);
  };
}

export function iteratorToStream(iterator: AsyncIterableIterator<any>) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}
