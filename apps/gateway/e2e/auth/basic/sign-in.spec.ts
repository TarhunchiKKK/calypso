import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { SignInDto, SignUpDto } from "@repo/common";
import { BasicAuthApi } from "e2e/shared/api/auth/basic-auth.api";

test.describe("POST /basic-auth/sign-in", () => {
    test("success", async ({ request }) => {
        const signUpDto: SignUpDto = {
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        await BasicAuthApi.signUp(request, signUpDto);

        const dto: SignInDto = {
            email: signUpDto.email,
            password: signUpDto.password
        };

        const { json: user } = await BasicAuthApi.signIn(request, dto);

        expect(user.email).toBe(dto.email);
    });
});
