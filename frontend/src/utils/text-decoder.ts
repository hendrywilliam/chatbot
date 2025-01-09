export function decode() {
    const decoder = new TextDecoder("utf8");
    return function (chunk: Uint8Array | undefined) {
        if (typeof chunk === "undefined") return;
        return decoder.decode(chunk, {
            stream: true,
        });
    };
}
