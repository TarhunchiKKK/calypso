import { faker } from "@faker-js/faker";
import { test } from "@playwright/test";
import type { SignUpDto } from "@repo/common";
import { BasicAuthApi } from "tests/shared/api/auth/basic-auth.api";

test.describe("POST /basic-auth/sign-out", () => {
    test("success", async ({ request }) => {
        const dto: SignUpDto = {
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        await test.step("Sign up", async () => {
            await BasicAuthApi.signUp(request, dto);
        });

        await test.step("Sign out", async () => {
            await BasicAuthApi.signOut(request);
        });
    });
});
