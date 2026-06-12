import type { FindPresetsDto, MediaDomains } from "@lib/media";

export const queryKeys = {
    presets: (dto: FindPresetsDto) => ["presets", dto.domain, dto.groupId],
    groups: (domain: MediaDomains) => ["presets-groups", domain]
};
