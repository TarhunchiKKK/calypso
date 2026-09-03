import type { Profile } from "@lib/auth";
import * as argon2 from "argon2";
import type { User } from "src/auth/users/entities/user.entity";

export const MockUser: User = {
    id: crypto.randomUUID(),
    username: "John Doe",
    email: "john@gmail.com",
    emailVerified: true,
    password: "Password123",
    avatar: "john-doe.png"
};

export const MockProfile: Profile = {
    id: MockUser.id,
    username: MockUser.username,
    email: MockUser.email,
    emailVerified: MockUser.emailVerified,
    avatar: MockUser.avatar
};

export async function getMockPasswordHash() {
    return await argon2.hash(MockUser.password);
}
