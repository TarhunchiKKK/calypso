import { useMutation } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/model";

export function useResetPassword() {
    return useMutation({
        mutationFn: async () => {
            return await ApiInstance.post<void>("/password-recovery/reset");
        }
    });
}
