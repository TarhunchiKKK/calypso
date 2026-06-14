import { mock } from "bun:test";
import type { WithMockedMethods } from "@api/common";
import type { User } from "@lib/auth";
import type { UsersHelper } from "src/auth/users/users.helper";

export function createUsersHelperMock() {
    return {
        findOneById: mock(() => Promise.resolve({})),
        findOneByEmail: mock(() => Promise.resolve({})),
        findManyByIds: mock(() => Promise.resolve({})),
        create: mock(() => Promise.resolve({})),
        update: mock(() => Promise.resolve({})),
        userToProfile: mock((user: User) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                emailVerified: user.emailVerified,
                avatar: user.avatar
            };
        })
    } satisfies WithMockedMethods<UsersHelper>;
}
