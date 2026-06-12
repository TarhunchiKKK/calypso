import type { FindPresetsDto, Media } from "@lib/media";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/api";
import { queryKeys } from "./api.lib";

export function findPresetsOptions(dto: FindPresetsDto) {
    return queryOptions({
        queryKey: queryKeys.presets(dto),
        queryFn: async () => {
            return await ApiInstance.get<Media[]>("/media/presets", {
                params: dto
            });
        }
    });
}

export function useFindPresets(dto: FindPresetsDto) {
    return useQuery(findPresetsOptions(dto));
}
