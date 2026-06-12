import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApi } from "@/entities/auth";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/model";

export function useVerifyEmail(options: CommonMutationOptions = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (token: string) => {
            return await ApiInstance.patch(`/email-verification/verify/${token}`);
        },
        onSuccess: (data, variables, result, context) => {
            queryClient.invalidateQueries({ queryKey: AuthApi.queryKeys.profile });

            options.onSuccess?.(data, variables, result, context);
        }
    });
}
