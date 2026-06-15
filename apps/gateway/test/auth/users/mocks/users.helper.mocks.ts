import { mock } from "bun:test";
import type { User } from "@lib/auth";
import type { UsersHelper } from "src/auth/users/users.helper";

export function createUsersHelperMock() {
    return {
        findOneById: mock<UsersHelper["findOneById"]>((() => {}) as any),
        findOneByEmail: mock<UsersHelper["findOneByEmail"]>((() => {}) as any),
        findManyByIds: mock<UsersHelper["findManyByIds"]>((() => {}) as any),
        create: mock<UsersHelper["create"]>((() => {}) as any),
        update: mock<UsersHelper["update"]>((() => {}) as any),
        userToProfile: mock((user: User) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                emailVerified: user.emailVerified,
                avatar: user.avatar
            };
        })
    } satisfies Record<keyof UsersHelper, unknown>;
}
