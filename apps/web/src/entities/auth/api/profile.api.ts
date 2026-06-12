import type { Profile } from "@lib/auth";
import { useQuery } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/model";
import { queryKeys } from "./api.lib";

export function useProfile() {
    return useQuery({
        queryKey: queryKeys.profile,
        queryFn: async () => {
            return await ApiInstance.get<Profile>("/auth/basic/profile");
        }
    });
}
