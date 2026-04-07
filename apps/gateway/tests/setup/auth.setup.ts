import { expect, test as setup } from "@playwright/test";
import { TestUser } from "tests/shared/constants";

const authFile = "playwright/.auth/session.json";

setup("sign up new user", async ({ request }) => {
    const response = await request.post("/basic-auth/sign-up", {
        data: TestUser
    });

    await expect(response).toBeOK();

    await request.storageState({ path: authFile });
});
