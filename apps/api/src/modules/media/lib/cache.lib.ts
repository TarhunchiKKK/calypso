import type { FindMediaPresetsGrpcRequest } from "@contracts/grpc";
import type { MediaDomains } from "@lib/media";

export const MediaCacheKeys = {
    groups: {
        byDomain: (domain: MediaDomains) => `media:groups:${domain}`
    },
    media: {
        byDomain: (domain: MediaDomains) => `media:${domain}`,
        byDomainAndGroupId: (dto: FindMediaPresetsGrpcRequest) => `media:${dto.domain}:${dto.groupId}`
    }
};

export const MediaCacheTtls = {
    groups: {
        byDomain: 5000
    },
    media: {
        byDomain: 5000,
        byDomainAndGroupId: 5000
    }
};
