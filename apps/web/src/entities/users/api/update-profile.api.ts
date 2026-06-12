import type { UpdateProfileDto } from "@lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApi } from "@/entities/auth";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/model";

export function useUpdateProfile(options: CommonMutationOptions = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (dto: UpdateProfileDto) => {
            return await ApiInstance.patch("/users", dto);
        },
        onSuccess: (data, variables, result, context) => {
            queryClient.invalidateQueries({ queryKey: AuthApi.queryKeys.profile });

            options.onSuccess?.(data, variables, result, context);
        }
    });
}
