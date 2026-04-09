import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { SignUpDto } from "@repo/common";
import { BasicAuthApi } from "tests/shared/api/auth/basic-auth.api";

test.describe("POST /basic-auth/sign-up", () => {
    test("success", async ({ request }) => {
        const dto: SignUpDto = {
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const { json: user } = await BasicAuthApi.signUp(request, dto);

        expect(user.email).toBe(dto.email);
    });
});
