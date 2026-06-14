import type { Media } from "src/media/entities/media.entity";

export const MockMedia: Media = {
    id: crypto.randomUUID(),
    domain: "board-node-media",
    url: "media.png",
    group: {
        id: crypto.randomUUID(),
        title: "Media Group",
        thumbnail: "group-thumbnail.png",
        media: []
    }
};
