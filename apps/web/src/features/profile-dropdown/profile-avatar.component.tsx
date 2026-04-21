import type { Profile } from "@repo/common";
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from "@/shared/ui/kit";
import { AuthApi } from "../auth";

function extractAvatarFallback(profile: Profile) {
    return profile.username
        .split("")
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join();
}

export function ProfileAvatar() {
    const { data: profile } = AuthApi.useProfile();

    return (
        <>
            {profile && (
                <Avatar>
                    <AvatarImage src={profile.avatar} alt="Avatar" />

                    <AvatarFallback>
                        {profile ? extractAvatarFallback(profile) : ""}
                    </AvatarFallback>
                </Avatar>
            )}

            {!profile && <Skeleton className="size-10 shrink-0 rounded-full" />}
        </>
    );
}
