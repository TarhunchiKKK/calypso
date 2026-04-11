import { useMutation, useQuery } from "@tanstack/react-query";
import { ThumbnailsS3ServiceInstance } from "./thumbnails.s3-service";

const queryKeys = {
    thumbnails: ["thumbnails"]
};

function useGetPresets() {
    return useQuery({
        queryKey: queryKeys.thumbnails,
        queryFn: async () => {
            return await ThumbnailsS3ServiceInstance.getPresets();
        }
    });
}

function useUpload() {
    return useMutation({
        mutationFn: async (dto: { key: string; file: File }) => {
            await ThumbnailsS3ServiceInstance.upload(dto.key, dto.file);
        }
    });
}

export const ThumbnailsApi = {
    useGetPresets,
    useUpload
};
