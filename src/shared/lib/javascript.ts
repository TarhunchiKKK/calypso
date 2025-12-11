export function joinSets<T>(set1: Set<T>, set2: Set<T>) {
    return new Set([...set1, ...set2]);
}
