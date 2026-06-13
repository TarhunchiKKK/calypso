import { mock } from "bun:test";
import type { Repository } from "typeorm";
import type { WithMockedMethods } from "./lib";

type RepositoryFields = "findOne" | "find" | "save" | "remove" | "delete";

export function createRepositoryMock<T extends Record<string, unknown> = Record<never, unknown>>(): WithMockedMethods<Pick<Repository<T>, RepositoryFields>> {
    return {
        findOne: mock(() => Promise.resolve({})),
        find: mock(() => Promise.resolve({})),
        save: mock(() => Promise.resolve({})),
        remove: mock(() => Promise.resolve({})),
        delete: mock(() => Promise.resolve({}))
    };
}
