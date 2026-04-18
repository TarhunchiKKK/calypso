import { faker } from "@faker-js/faker";
import type { CreateBoardDto } from "@repo/boards-common";
import type { SignUpDto } from "@repo/common";

export const TestUser: SignUpDto = {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password()
};

export const TestBoard: CreateBoardDto = {
    title: "Test Board",
    thumbnail: "thumbnail-url"
};
