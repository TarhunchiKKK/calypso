import type { APIRequestContext } from "@playwright/test";
import type { Profile, SignInDto, SignUpDto } from "@repo/common";

export class BasicAuthApi {
    public static async signUp(request: APIRequestContext, dto: SignUpDto) {
        const response = await request.post("/basic-auth/sign-up", {
            data: dto
        });

        const json: Profile = await response.json();

        return { response, json };
    }

    public static async signIn(request: APIRequestContext, dto: SignInDto) {
        const response = await request.post("/basic-auth/sign-in", {
            data: dto
        });

        const json: Profile = await response.json();

        return { response, json };
    }

    public static async signOut(request: APIRequestContext) {
        const response = await request.post("/basic-auth/sign-out");

        return { response };
    }

    public static async getProfile(request: APIRequestContext) {
        const response = await request.get("/basic-auth/profile");

        const json: Profile = await response.json();

        return { response, json };
    }
}
