import { mock } from "bun:test";
import type { Repository } from "typeorm";
import type { WithMockedMethods } from "./lib";

export function createRepositoryMock() {
    return {
        findOne: mock(() => Promise.resolve({})),
        find: mock(() => Promise.resolve({})),
        save: mock(() => Promise.resolve({})),
        remove: mock(() => Promise.resolve({})),
        delete: mock(() => Promise.resolve({}))
    } satisfies Partial<WithMockedMethods<Repository<any>>>;
}
