import { useMutation } from "@tanstack/react-query";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/model";

export function useResetPassword(options: CommonMutationOptions = {}) {
    return useMutation({
        ...options,
        mutationFn: async (_: void) => {
            return await ApiInstance.post<void>("/password-recovery/reset");
        }
    });
}
