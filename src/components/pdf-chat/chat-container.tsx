"use client";

import { ReactNode, useState } from "react";

export function PdfChatContainer({ children }: { children: ReactNode }) {
  const [totalWindow, setTotalWindow] = useState(1);

  return <div className="flex h-full flex-1">{children}</div>;
}
