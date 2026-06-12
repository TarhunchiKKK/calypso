import { useMutation } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/model";

function useSend() {
    return useMutation({
        mutationFn: async () => {
            return await ApiInstance.post<void>("/email-verification/send");
        }
    });
}

function useVerify() {
    return useMutation({
        mutationFn: async (token: string) => {
            return await ApiInstance.patch(`/email-verification/verify/${token}`);
        }
    });
}

export const EmailVerificationApi = {
    useSend,
    useVerify
};
