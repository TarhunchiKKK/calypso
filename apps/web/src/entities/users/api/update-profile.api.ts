import type { UpdateProfileDto } from "@lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApi } from "@/entities/auth";
import { ApiInstance } from "@/shared/model";

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: UpdateProfileDto) => {
            return await ApiInstance.patch("/users", dto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: AuthApi.queryKeys.profile });
        }
    });
}
