import { Avatar, AvatarFallback, AvatarImage, Skeleton } from "@/shared/ui/kit";
import { AuthApi } from "../auth";

export function ProfileAvatar() {
    const { data } = AuthApi.useProfile();

    return (
        <>
            {data && (
                <Avatar>
                    <AvatarImage src={data.user?.metadata.avatar} alt="Avatar" />

                    <AvatarFallback>{data.user?.email?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            )}

            {!data && <Skeleton className="size-10 shrink-0 rounded-full" />}
        </>
    );
}
