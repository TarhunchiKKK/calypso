import type { Profile, SignInDto, SignUpDto } from "@lib/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/model";

const queryKeys = {
    profile: ["profile"]
};

function useSignUp(options: CommonMutationOptions = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (dto: SignUpDto) => {
            return await ApiInstance.post<Profile>("/auth/basic/sign-up", dto);
        },
        onSuccess: (data, variables, result, context) => {
            queryClient.setQueryData(queryKeys.profile, () => data);

            options.onSuccess?.(data, variables, result, context)
        }
    });
}

function useSignIn(options: CommonMutationOptions = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (dto: SignInDto) => {
            return await ApiInstance.post<Profile>("/auth/basic/sign-in", dto);
        },
        onSuccess: (data, variables, result, context) => {
            queryClient.setQueryData(queryKeys.profile, () => data);

            options.onSuccess?.(data, variables, result, context);
        }
    });
}

function useSignOut(options: CommonMutationOptions = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (_: void) => {
            return await ApiInstance.post("/auth/basic/sign-out");
        },
        onSuccess: (data, variables, result, context) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.profile });

            options.onSuccess?.(data, variables, result, context)
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
    queryKeys,
    useSignUp,
    useSignIn,
    useSignOut,
    useProfile
};
