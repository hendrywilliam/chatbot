import * as React from "react";

export function useEnterToSubmit(
  target: React.RefObject<HTMLFormElement>,
  key: string = "Enter"
) {
  if (!target) return;
  const enterToSubmit = function (event: React.KeyboardEvent<HTMLFormElement>) {
    if (event.key === key && event.ctrlKey) {
      event.preventDefault();
      target?.current?.requestSubmit();
    }
  };

  return enterToSubmit;
}
