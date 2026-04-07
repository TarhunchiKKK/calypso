import type { User } from "@repo/common";
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from "@/shared/ui/kit";
import { AuthApi } from "../auth";

function extractAvatarFallback(user: User) {
    if (user.metadata.fullName) {
        return user.metadata.fullName
            .split(" ")
            .slice(0, 2)
            .map(name => name[0].toUpperCase());
    }

    if (user.email) {
        return user.email[0].toUpperCase();
    }

    return "";
}

export function ProfileAvatar() {
    const { data } = AuthApi.useProfile();

    return (
        <>
            {data && (
                <Avatar>
                    <AvatarImage src={data.user?.metadata.avatar} alt="Avatar" />

                    <AvatarFallback>{data.user ? extractAvatarFallback(data.user) : ""}</AvatarFallback>
                </Avatar>
            )}

            {!data && <Skeleton className="size-10 shrink-0 rounded-full" />}
        </>
    );
}
