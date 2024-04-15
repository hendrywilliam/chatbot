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

export function getEntriesFormData<T = Record<string, any>>(
  formData: FormData,
): T {
  const keyValuePair: Record<string, any> = {};
  for (const pair of formData.entries()) {
    keyValuePair[pair[0]] = pair[1];
  }
  return keyValuePair as T;
}
