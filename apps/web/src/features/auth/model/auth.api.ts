import type { AuthResponse, SignInDto, SignUpDto } from "@repo/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/model";

const queryKeys = {
    profile: ["profile"]
};

export function useSignUp() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: SignUpDto) => {
            return await ApiInstance.post<AuthResponse>("/auth/sign-up", dto);
        },
        onSuccess: data => {
            queryClient.setQueryData(queryKeys.profile, () => data.user);
        }
    });
}

function useSignIn() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: SignInDto) => {
            return await ApiInstance.post<AuthResponse>("/auth/sign-in", dto);
        },
        onSuccess: data => {
            queryClient.setQueryData(queryKeys.profile, () => data.user);
        }
    });
}

function useSignOut() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            return await ApiInstance.post("/auth/sign-out");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.profile });
        }
    });
}

function useProfile() {
    return useQuery({
        queryKey: queryKeys.profile,
        queryFn: async () => {
            return await ApiInstance.get<AuthResponse>("/auth/profile");
        }
    });
}

export const AuthApi = {
    useSignUp,
    useSignIn,
    useSignOut,
    useProfile
};
