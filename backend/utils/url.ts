export const addSearchParams = function (
    url: URL,
    searchParams: Record<string, string>
): string {
    Object.entries(searchParams).forEach(([key, value]) =>
        url.searchParams.set(key, value)
    );
    return url.toString();
};
