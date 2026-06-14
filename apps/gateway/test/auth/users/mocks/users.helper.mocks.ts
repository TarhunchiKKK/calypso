import { mock } from "bun:test";
import type { WithMockedMethods } from "@api/common";
import type { UsersHelper } from "src/auth/users/users.helper";

export function createUsersHelperMock() {
    return {
        findOneById: mock(() => Promise.resolve({})),
        findOneByEmail: mock(() => Promise.resolve({})),
        findManyByIds: mock(() => Promise.resolve({})),
        create: mock(() => Promise.resolve({})),
        update: mock(() => Promise.resolve({})),
        userToProfile: mock(() => Promise.resolve({}))
    } satisfies WithMockedMethods<UsersHelper>;
}
