import { Message } from "@/types";
import { nanoid } from "nanoid";

const now = new Date();
export const fakeChats = [
  {
    content: "Why do we use lorem ipsum?",
    id: nanoid(),
    role: "user",
    createdAt: now,
  },
  {
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    id: nanoid(),
    role: "assistant",
    createdAt: now,
  },
  {
    content: "Where does it come from?",
    id: nanoid(),
    role: "user",
    createdAt: now,
  },
  {
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of `de Finibus Bonorum et Malorum` (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.",
    id: nanoid(),
    role: "assistant",
    createdAt: now,
  },
  {
    content: "Where can I get some?",
    id: nanoid(),
    role: "user",
    createdAt: now,
  },
  {
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text",
    id: nanoid(),
    role: "assistant",
    createdAt: now,
  },
  {
    content: "Where can I get some?",
    id: nanoid(),
    role: "user",
    createdAt: now,
  },
  {
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text",
    id: nanoid(),
    role: "assistant",
    createdAt: now,
  },
  {
    content: "Where can I get some?",
    id: nanoid(),
    role: "user",
    createdAt: now,
  },
  {
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text",
    id: nanoid(),
    role: "assistant",
    createdAt: now,
  },
  {
    content: "Where can I get some?",
    id: nanoid(),
    role: "user",
    createdAt: now,
  },
  {
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. [END]",
    id: nanoid(),
    role: "assistant",
    createdAt: now,
  },
] satisfies Message[];
