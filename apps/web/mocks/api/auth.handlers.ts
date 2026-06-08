import type { Profile } from "@lib/auth";
import { delay, HttpResponse, http } from "msw";
import { Env } from "@/shared/config";

export const mswAuthHandlers = {
    profile: http.get(`${Env.api.url}/auth/basic/profile`, async () => {
        await delay(800);
        return HttpResponse.json<Profile>({
            id: "account-id",
            username: "john Doe",
            email: "johndoe@gmail.com",
            avatar: "https://github.com/shadcn.png"
        });
    })
};
