import type { Id } from "../shared/db.types";
import type { MediaDomains } from "./types";

export type FindPresetsDto = {
    domain: MediaDomains;

    groupId?: Id;
};

export type GetPresignedUrlDto = {
    fileName: string;

    contentType: string;
};

export type GetPresignedUrlResponse = {
    key: string;

    url: string;
};
