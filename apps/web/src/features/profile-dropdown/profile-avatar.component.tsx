import type { Profile } from "@lib/auth";
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from "@/shared/ui/kit";
import { AuthApi } from "../auth";

export function extractAvatarFallback(profile: Profile) {
    const parts = profile.username.split(" ");

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return parts
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("");
}

export function ProfileAvatar() {
    const { data: profile } = AuthApi.useProfile();

    return (
        <>
            {profile && (
                <Avatar>
                    <AvatarImage src={profile.avatar} alt="Avatar" />

                    <AvatarFallback>{profile ? extractAvatarFallback(profile) : ""}</AvatarFallback>
                </Avatar>
            )}

            {!profile && <Skeleton className="size-10 shrink-0 rounded-full" />}
        </>
    );
}
