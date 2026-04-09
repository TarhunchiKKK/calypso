import type { CreateBoardDto } from "@repo/boards-common";
import type { SignUpDto } from "@repo/common";

export const TestUser: SignUpDto = {
    email: "test@gmail.com",
    password: "TestPassword123"
};

export const TestBoard: CreateBoardDto = {
    title: "Test Board",
    thumbnail: "thumbnail-url"
};
