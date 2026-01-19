export function sharedItems<T>(lists: Set<T>[]): T[] {
    const intersection = lists.reduce((acc, currentSet) => {
        if (!acc) {
            return new Set(currentSet);
        }

        return new Set([...acc].filter(item => currentSet.has(item)));
    }, new Set());

    return Array.from(intersection);
}
