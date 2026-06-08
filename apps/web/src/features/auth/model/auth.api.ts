import type { Profile, SignInDto, SignUpDto } from "@lib/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/model";

const queryKeys = {
    profile: ["profile"]
};

function useSignUp() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: SignUpDto) => {
            return await ApiInstance.post<Profile>("/auth/basic/sign-up", dto);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.profile, () => data);
        }
    });
}

function useSignIn() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: SignInDto) => {
            return await ApiInstance.post<Profile>("/auth/basic/sign-in", dto);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.profile, () => data);
        }
    });
}

function useSignOut() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            return await ApiInstance.post("/auth/basic/sign-out");
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
            return await ApiInstance.get<Profile>("/auth/basic/profile");
        }
    });
}

export const AuthApi = {
    useSignUp,
    useSignIn,
    useSignOut,
    useProfile
};
