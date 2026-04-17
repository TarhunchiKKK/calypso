import { expect, test } from "@playwright/test";
import type { FindPresetsDto } from "@repo/common";
import { MediaApi } from "e2e/shared/api/media.api";

test.describe("GET /media/presets", () => {
    test("success", async ({ request }) => {
        const dto: FindPresetsDto = {
            domain: "board-node-media"
        };

        const { response } = await MediaApi.findPresets(request, dto);

        expect(response).toBeOK();
    });
});
