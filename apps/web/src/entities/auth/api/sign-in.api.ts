import type { Profile, SignInDto } from "@lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/api";
import { queryKeys } from "./api.lib";

export function useSignIn(options: CommonMutationOptions = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (dto: SignInDto) => {
            return await ApiInstance.post<Profile>("/auth/basic/sign-in", dto);
        },
        onSuccess: (data, variables, result, context) => {
            queryClient.setQueryData(queryKeys.profile, () => data);

            options.onSuccess?.(data, variables, result, context);
        }
    });
}
