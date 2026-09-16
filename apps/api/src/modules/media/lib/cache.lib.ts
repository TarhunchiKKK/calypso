import type { FindPresetsDto, MediaDomains } from "@lib/media";

export const MediaCacheKeys = {
    groups: {
        byDomain: (domain: MediaDomains) => `media:groups:${domain}`
    },
    media: {
        byDomain: (domain: MediaDomains) => `media:${domain}`,
        byDomainAndGroupId: (dto: FindPresetsDto) => `media:${dto.domain}:${dto.groupId}`
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
