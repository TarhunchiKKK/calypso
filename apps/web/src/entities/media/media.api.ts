import type { FindPresetsDto, GetPresignedUrlDto, GetPresignedUrlResponse, Media, MediaDomains, MediaGroup } from "@lib/media";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/model";

const queryKeys = {
    presets: (dto: FindPresetsDto) => ["presets", dto.domain, dto.groupId],
    groups: (domain: MediaDomains) => ["presets-groups", domain]
};

function findPresetsOptions(dto: FindPresetsDto) {
    return queryOptions({
        queryKey: queryKeys.presets(dto),
        queryFn: async () => {
            return await ApiInstance.get<Media[]>("/media/presets", {
                params: dto
            });
        }
    });
}

function useFindPresets(dto: FindPresetsDto) {
    return useQuery(findPresetsOptions(dto));
}

function findPresetsGroupsOptions(domain: MediaDomains) {
    return queryOptions({
        queryKey: queryKeys.groups(domain),
        queryFn: async () => {
            return await ApiInstance.get<MediaGroup[]>(`/media/presets/${domain}`);
        },
        enabled: !!domain,
        staleTime: "static"
    });
}

function useFindPresetsGroups(domain: MediaDomains) {
    return useQuery(findPresetsGroupsOptions(domain));
}

function useGetPresignedUrl(options: CommonMutationOptions = {}) {
    return useMutation({
        ...options,
        mutationFn: async (dto: GetPresignedUrlDto) => {
            return await ApiInstance.get<GetPresignedUrlResponse>("/media/presigned-url", {
                params: dto
            });
        }
    });
}

function useRandomMedia(dto: FindPresetsDto) {
    const { data: thumbnails } = useFindPresets(dto);

    return useMemo(() => {
        if (!thumbnails) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * thumbnails.length);

        return thumbnails[randomIndex];
    }, [thumbnails]);
}

export const MediaApi = {
    options: {
        findPresets: findPresetsOptions,
        findPresetsGroups: findPresetsGroupsOptions
    },
    useFindPresets,
    useFindPresetsGroups,
    useGetPresignedUrl,
    useRandomMedia
};
