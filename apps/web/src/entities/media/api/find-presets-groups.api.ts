import type { MediaDomains, MediaGroup } from "@lib/media";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/api";
import { queryKeys } from "./api.lib";

export function findPresetsGroupsOptions(domain: MediaDomains) {
    return queryOptions({
        queryKey: queryKeys.groups(domain),
        queryFn: async () => {
            return await ApiInstance.get<MediaGroup[]>(`/media/presets/${domain}`);
        },
        enabled: !!domain,
        staleTime: "static"
    });
}

export function useFindPresetsGroups(domain: MediaDomains) {
    return useQuery(findPresetsGroupsOptions(domain));
}
