import type { UpdatePasswordDto } from "@lib/auth";
import { useMutation } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/model";

export function useUpdatePassword() {
    return useMutation({
        mutationFn: async (dto: UpdatePasswordDto & { token: string }) => {
            const { token, ...body } = dto;

            return await ApiInstance.patch<void>(`/password-recovery/update/${token}`, body);
        }
    });
}
