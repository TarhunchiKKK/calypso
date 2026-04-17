import { expect, test } from "@playwright/test";
import type { GetPresignedUrlDto } from "@repo/common";
import { MediaApi } from "e2e/shared/api/media.api";

test.describe("GET /media/presigned-url", () => {
    test("success", async ({ request }) => {
        const dto: GetPresignedUrlDto = {
            fileName: "some-image.png",
            contentType: "image"
        };

        const { response } = await MediaApi.getPresignedUrl(request, dto);

        expect(response).toBeOK();
    });
});
