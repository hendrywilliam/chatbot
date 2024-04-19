import * as React from "react";

export function useEnterToSubmit(
  target: React.RefObject<HTMLFormElement>,
  submitter: React.RefObject<HTMLButtonElement>,
  key: string = "Enter",
) {
  if (!target) return;
  const enterToSubmit = function (event: React.KeyboardEvent<HTMLFormElement>) {
    if (submitter.current?.disabled) {
      return;
    }
    if (event.key === key) {
      event.preventDefault();
      target?.current?.requestSubmit(submitter.current);
    }
  };

  return enterToSubmit;
}
