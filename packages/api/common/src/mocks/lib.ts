import type { Mock } from "bun:test";

export type WithMockedMethods<T> = {
    [Key in keyof T]: T[Key] extends (...args: any[]) => any ? Mock<any> : T[Key];
};

export function clearMock(mock: Record<string, unknown>) {
    Object.values(mock).forEach((value) => {
        if (typeof value === "object" && value !== null && "mockClear" in value && typeof value.mockClear === "function") {
            value.mockClear();
        }
    });
}
