import type { FindPresetsDto, GetPresignedUrlDto, GetPresignedUrlResponse, Media, MediaDomains, MediaGroup } from "@repo/media";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import { ApiInstance } from "@/shared/model";

const queryKeys = {
    presets: (dto: FindPresetsDto) => ["presets", dto.domain, dto.groupId],
    groups: (domain: MediaDomains) => ["presets-groups", domain]
};

function useFindPresets(dto: FindPresetsDto) {
    return useQuery({
        queryKey: queryKeys.presets(dto),
        queryFn: async () => {
            return await ApiInstance.get<Media[]>("/media/presets", {
                params: dto
            });
        }
    });
}

function useFindPresetsGroups(domain: MediaDomains) {
    return useQuery({
        queryKey: queryKeys.groups(domain),
        queryFn: async () => {
            return await ApiInstance.get<MediaGroup[]>(`/media/presets/${domain}`);
        }
    });
}

function useGetPresignedUrl() {
    return useMutation({
        mutationFn: async (dto: GetPresignedUrlDto) => {
            return await ApiInstance.get<GetPresignedUrlResponse>("/media/presigned-url", {
                params: dto
            });
        },
        onError: () => {
            toast.error("Cannot get presigned url");
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
    useFindPresets,
    useFindPresetsGroups,
    useGetPresignedUrl,
    useRandomMedia
};
