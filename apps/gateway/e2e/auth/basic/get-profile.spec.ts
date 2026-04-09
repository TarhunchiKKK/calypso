import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { SignUpDto } from "@repo/common";
import { BasicAuthApi } from "e2e/shared/api/auth/basic-auth.api";

test.describe("POST /basic-auth/profile", () => {
    test("success", async ({ request }) => {
        const dto: SignUpDto = {
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        await test.step("Sign up", async () => {
            await BasicAuthApi.signUp(request, dto);
        });

        await test.step("Get profile", async () => {
            const { json: profile } = await BasicAuthApi.getProfile(request);

            expect(profile.email).toBe(dto.email);
        });
    });
});
