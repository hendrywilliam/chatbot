import { OpenAIIconBlack } from "@/components/ui/icons";
import type { Models } from "@/types";
/** Chat models */
export const models = [
  {
    label: "gpt-3.5-turbo-0125",
    value: "gpt-3.5-turbo-0125",
    description:
      "The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats and a fix for a bug which caused a text encoding issue for non-English language function calls.",
    author: "OpenAI",
    href: ["https://platform.openai.com/"],
    icon: OpenAIIconBlack,
  },
  {
    label: "gpt-3.5-turbo",
    value: "gpt-3.5-turbo",
    description:
      "GPT-3.5 Turbo models can understand and generate natural language or code and have been optimized for chat.",
    author: "OpenAI",
    href: ["https://platform.openai.com/"],
    icon: OpenAIIconBlack,
  },
  {
    label: "gpt-4",
    value: "gpt-4",
    description:
      "GPT-4 is a large multimodal model (accepting text or image inputs and outputting text) that can solve difficult problems with greater accuracy than any of our previous models, thanks to its broader general knowledge and advanced reasoning capabilities.",
    author: "OpenAI",
    href: ["https://platform.openai.com/"],
    icon: OpenAIIconBlack,
  },
] satisfies Models[];
