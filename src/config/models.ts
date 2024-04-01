import { OpenAIIcon } from "@/components/ui/icons";
/** Chat models */
export const models = [
  {
    label: "gpt-3.5-turbo-0125",
    value: "gpt-3.5-turbo-0125",
    author: "OpenAI",
    icon: OpenAIIcon,
  },
  {
    label: "gpt-3.5-turbo",
    value: "gpt-3.5-turbo",
    author: "OpenAI",
    icon: OpenAIIcon,
  },
  {
    label: "gpt-4",
    value: "gpt-4",
    author: "OpenAI",
    icon: OpenAIIcon,
  },
] satisfies {
  label: string;
  value: string;
  author: string;
  icon: any;
}[];
