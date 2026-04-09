import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { SignInDto } from "@repo/common";
import { BasicAuthApi } from "e2e/shared/api/auth/basic-auth.api";

test.describe("POST /basic-auth/sign-in", () => {
    test("success", async ({ request }) => {
        const dto: SignInDto = {
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const { json: user } = await BasicAuthApi.signIn(request, dto);

        expect(user.email).toBe(dto.email);
    });
});
