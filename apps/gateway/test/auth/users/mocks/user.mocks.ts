import type { User } from "src/auth/users/entities/user.entity";

export const MockUser: User = {
    id: crypto.randomUUID(),
    username: "John Doe",
    email: "john@gmail.com",
    emailVerified: true,
    password: "Password123",
    avatar: "john-doe.png"
};
