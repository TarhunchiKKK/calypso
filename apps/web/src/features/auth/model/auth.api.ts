import type { SignInDto, SignUpDto } from "@repo/common";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "@/shared/config";

export function useSignUp() {
    return useMutation({
        mutationFn: async (dto: SignUpDto) => {
            return await AxiosInstance.post("/auth/sign-up", dto);
        }
    });
}

function useSignIn() {
    return useMutation({
        mutationFn: async (dto: SignInDto) => {
            return await AxiosInstance.post("/auth/sign-in", dto);
        }
    });
}

export const AuthApi = {
    useSignUp,
    useSignIn
};
