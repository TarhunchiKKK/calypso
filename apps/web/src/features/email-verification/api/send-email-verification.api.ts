import { useMutation } from "@tanstack/react-query";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/api";

export function useSendEmailVerification(options: CommonMutationOptions = {}) {
    return useMutation({
        ...options,
        mutationFn: async (_: void) => {
            return await ApiInstance.post<void>("/email-verification/send");
        }
    });
}
