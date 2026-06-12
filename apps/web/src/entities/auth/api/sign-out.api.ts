import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/api";
import { queryKeys } from "./api.lib";

export function useSignOut(options: CommonMutationOptions = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (_: void) => {
            return await ApiInstance.post("/auth/basic/sign-out");
        },
        onSuccess: (data, variables, result, context) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.profile });

            options.onSuccess?.(data, variables, result, context);
        }
    });
}
