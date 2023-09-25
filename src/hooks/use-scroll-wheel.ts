import * as React from "react";

export function useScrollWheel(
  target: React.RefObject<HTMLElement>,
  threshold = 2
): [
  counter: number,
  escapeAnchor: boolean,
  triggerWheel: (event: React.WheelEvent<HTMLElement>) => void
] {
  const [counter, setCounter] = React.useState(0);
  const [escapeAnchor, setEscapeAnchor] = React.useState(false);

  const triggerWheel = function (event: React.WheelEvent<HTMLElement>) {
    if (!target.current) return;
    if (event.deltaY < 0 && counter !== threshold) {
      setCounter((counter) => counter + 1);
    }
    if (
      target.current.scrollHeight - target.current.scrollTop ===
        target.current.clientHeight &&
      event.deltaY > 0
    ) {
      setCounter(0);
      setEscapeAnchor(false);
    }
    return;
  };

  React.useEffect(() => {
    if (counter === threshold) {
      setEscapeAnchor(true);
    }
    return;
  }, [counter, escapeAnchor, threshold]);

  return [counter, escapeAnchor, triggerWheel];
}
