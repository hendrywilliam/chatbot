export function useCopyToClipboard(): (value: string) => void {
  const copy = async function (value: string) {
    try {
      if (!navigator.clipboard)
        throw new Error("Clipboard is not supported in your current browser.");
      await navigator.clipboard.writeText(value);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };
  return copy;
}
