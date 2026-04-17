import { expect, test } from "@playwright/test";
import type { MediaDomains } from "@repo/common";
import { MediaApi } from "e2e/shared/api/media.api";

test.describe("GET /media/presets/:domain", () => {
    test("success", async ({ request }) => {
        const domain: MediaDomains = "board-node-media";

        const { response } = await MediaApi.findGroups(request, domain);

        expect(response).toBeOK();
    });
});
