import type { Mock } from "bun:test";

export type WithMockedMethods<T> = {
    [Key in keyof T]: T[Key] extends (...args: any[]) => any ? Mock<any> : T[Key];
};

export function clearMock(mock: Record<string, Mock<any>>) {
    for (const key in mock) {
        mock[key]?.mockClear?.();
    }
}
