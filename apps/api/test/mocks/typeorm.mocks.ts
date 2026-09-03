import { mock } from "bun:test";
import type { ObjectLiteral, Repository } from "typeorm";

export function createRepositoryMock<T extends ObjectLiteral = never>() {
    return {
        findOne: mock<Repository<T>["findOne"]>((() => {}) as any),
        find: mock<Repository<T>["find"]>((() => {}) as any),
        save: mock<Repository<T>["save"]>(((data) => Promise.resolve(data)) as any),
        remove: mock<Repository<T>["remove"]>((() => {}) as any),
        delete: mock<Repository<T>["delete"]>((() => {}) as any)
    } satisfies Partial<Record<keyof Repository<T>, unknown>>;
}
