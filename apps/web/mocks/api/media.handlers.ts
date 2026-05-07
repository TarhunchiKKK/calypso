import type { Media, MediaDomains, MediaGroup } from "@repo/common";
import { HttpResponse, http } from "msw";
import { Env } from "@/shared/config";
import { MockBoardNodesMedia } from "%/entities/boards";
import { MockProjectThumbnails } from "%/entities/projects";

export const mswMediaHandlers = {
    findPresets: http.get(`${Env.api.url}/media/presets`, async ({ request }) => {
        const url = new URL(request.url);

        const domain = url.searchParams.get("domain") as MediaDomains;

        if (!domain) {
            return HttpResponse.json(null, {
                status: 400,
                statusText: "No 'domain' query parameter provided."
            });
        }

        let urls: string[] = [];
        switch (domain) {
            case "board-node-media":
                urls = MockBoardNodesMedia.animals;
                break;
            case "project-thumbnails":
                urls = MockProjectThumbnails;
                break;
        }

        return HttpResponse.json<Media[]>(
            urls.map((url, index) => ({
                id: `media-${index}`,
                url: url
            }))
        );
    }),
    findPresetsGroups: http.get(`${Env.api.url}/media/presets/:domain`, async ({ params }) => {
        const domain = params.domain as MediaDomains;

        if (domain === "project-thumbnails") {
            return new HttpResponse<MediaGroup[]>([]);
        }
        return HttpResponse.json<MediaGroup[]>(
            (Object.keys(MockBoardNodesMedia) as (keyof typeof MockBoardNodesMedia)[]).map(key => ({
                id: key,
                thumbnail: MockBoardNodesMedia[key][0],
                title: key
            }))
        );
    })
};
