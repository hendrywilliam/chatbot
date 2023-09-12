import * as React from "react";

export function useEnterToSubmit(
  target: React.RefObject<HTMLFormElement>,
  key: string = "Enter"
) {
  if (!target) return;
  const enterToSubmit = function (event: React.KeyboardEvent<HTMLFormElement>) {
    if (event.key === key) {
      target?.current?.requestSubmit();
    }
  };

  return enterToSubmit;
}
