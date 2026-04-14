import type { FindPresetsDto, GetPresignedUrlDto, GetPresignedUrlResponse, Media, MediaDomains, MediaGroup } from "@repo/common";
import { useMutation, useQuery } from "@tanstack/react-query";
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
                data: dto
            });
        },
        select: response => response.data
    });
}

function useFindPresetsGroups(domain: MediaDomains) {
    return useQuery({
        queryKey: queryKeys.groups(domain),
        queryFn: async () => {
            return await ApiInstance.get<MediaGroup[]>(`/media/presets/${domain}`);
        },
        select: response => response.data
    });
}

function useGetPresignedUrl() {
    return useMutation({
        mutationFn: async (dto: GetPresignedUrlDto) => {
            const response = await ApiInstance.get<GetPresignedUrlResponse>("/media/presigned-url", {
                data: dto
            });

            return response.data;
        },
        onError: () => {
            toast.error("Cannot get presigned url");
        }
    });
}

export const MediaApi = {
    useFindPresets,
    useFindPresetsGroups,
    useGetPresignedUrl
};
