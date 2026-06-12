import type { GetPresignedUrlDto, GetPresignedUrlResponse } from "@lib/media";
import { useMutation } from "@tanstack/react-query";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/api";

export function useGetPresignedUrl(options: CommonMutationOptions = {}) {
    return useMutation({
        ...options,
        mutationFn: async (dto: GetPresignedUrlDto) => {
            return await ApiInstance.get<GetPresignedUrlResponse>("/media/presigned-url", {
                params: dto
            });
        }
    });
}
