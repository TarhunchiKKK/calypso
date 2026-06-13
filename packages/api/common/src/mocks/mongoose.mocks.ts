import { mock } from "bun:test";
import type { WithMockedMethods } from "entry";
import type { Model } from "mongoose";

export function createMongooseModelMock() {
    return {
        find: mock(() => Promise.resolve({})),
        insertMany: mock(() => Promise.resolve({})),
        bulkWrite: mock(() => Promise.resolve({})),
        deleteMany: mock(() => Promise.resolve({}))
    } satisfies Partial<WithMockedMethods<Model<any>>>;
}
