import type { MediaGroup } from "src/media/entities/media-group.entity";

export const MockMediaGroup: MediaGroup = {
    id: crypto.randomUUID(),
    title: "Media Group",
    thumbnail: "group-thumbnail.png",
    media: [
        {
            id: crypto.randomUUID(),
            domain: "board-node-media",
            url: "media.png",
            group: null as unknown as MediaGroup
        }
    ]
};
