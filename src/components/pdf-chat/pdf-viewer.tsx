/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { UsePdfChatHelpers } from "@/types";
import { useEffect, useState } from "react";

interface Props extends Pick<UsePdfChatHelpers, "file"> {}

export function PdfViewerWindow({ file }: Props) {
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (file) {
      setFileUrl(URL.createObjectURL(file));
    }
    return () => {
      URL.revokeObjectURL(fileUrl);
    };
  }, [file]);

  return (
    <div className="flex h-full w-1/2 flex-col">
      <div className="flex-1">
        {fileUrl ? (
          <iframe src={fileUrl} width="100%" height="100%" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <p className="text-gray-500">
              Uh-oh im idling! Input your PDF to start viewing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
