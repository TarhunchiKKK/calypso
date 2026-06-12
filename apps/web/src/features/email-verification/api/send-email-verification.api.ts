import { useMutation } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/model";

export function useSendEmailVerification() {
    return useMutation({
        mutationFn: async () => {
            return await ApiInstance.post<void>("/email-verification/send");
        }
    });
}
