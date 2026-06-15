import { mock } from "bun:test";
import type { Model } from "mongoose";

export function createMongooseModelMock<T = never>() {
    return {
        find: mock<Model<T>["find"]>((() => {}) as any),
        insertMany: mock<Model<T>["insertMany"]>((() => {}) as any),
        bulkWrite: mock<Model<T>["bulkWrite"]>((() => {}) as any),
        deleteMany: mock<Model<T>["deleteMany"]>((() => {}) as any)
    } satisfies Partial<Record<keyof Model<T>, unknown>>;
}
