import type { UpdatePasswordDto } from "@lib/auth";
import { useMutation } from "@tanstack/react-query";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/model";

export function useUpdatePassword(options: CommonMutationOptions = {}) {
    return useMutation({
        ...options,
        mutationFn: async (dto: UpdatePasswordDto & { token: string }) => {
            const { token, ...body } = dto;

            return await ApiInstance.patch<void>(`/password-recovery/update/${token}`, body);
        }
    });
}
