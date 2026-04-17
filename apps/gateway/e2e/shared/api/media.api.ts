import type { APIRequestContext } from "@playwright/test";
import type { FindPresetsDto, GetPresignedUrlDto, GetPresignedUrlResponse, Media, MediaDomains, MediaGroup } from "@repo/common";

export class MediaApi {
    public static async findPresets(request: APIRequestContext, dto: FindPresetsDto) {
        const response = await request.get("/media/presets", {
            data: dto
        });

        const json: Media[] = await response.json();

        return { response, json, dto };
    }

    public static async findGroups(request: APIRequestContext, domain: MediaDomains) {
        const response = await request.get(`/media/presets/${domain}`);

        const json: MediaGroup[] = await response.json();

        return { response, json, domain };
    }

    public static async getPresignedUrl(request: APIRequestContext, dto: GetPresignedUrlDto) {
        const response = await request.get("/media/presigned-url", {
            data: dto
        });

        const json: GetPresignedUrlResponse = await response.json();

        return { response, json, dto };
    }
}
