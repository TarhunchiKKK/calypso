import { mock } from "bun:test";
import type { WithMockedMethods } from "entry";
import type { Model } from "mongoose";

type ModelFields = "find" | "insertMany" | "bulkWrite";

export function createMongooseModelMock() {
    return {
        find: mock(() => Promise.resolve({})),
        insertMany: mock(() => Promise.resolve({})),
        bulkWrite: mock(() => Promise.resolve({}))
    } satisfies WithMockedMethods<Pick<Model<any>, ModelFields>>;
}
