import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApi } from "@/entities/auth";
import { ApiInstance } from "@/shared/model";

export function useVerifyEmail() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (token: string) => {
            return await ApiInstance.patch(`/email-verification/verify/${token}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: AuthApi.queryKeys.profile });
        }
    });
}
