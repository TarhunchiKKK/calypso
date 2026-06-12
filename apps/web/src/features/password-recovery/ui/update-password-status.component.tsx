import { toast } from "sonner";
import { AuthApi } from "@/features/auth";
import { Button } from "@/shared/ui/kit";
import { PasswordRecoveryApi } from "../api";

export function UpdatePasswordStatus() {
    const { data: profile } = AuthApi.useProfile();

    const { mutateAsync, isPending } = PasswordRecoveryApi.useReset();

    if (!profile) {
        return null;
    }

    const handleReset = async () => {
        await mutateAsync();

        toast("Check your email");
    };

    return (
        <>
            {profile.emailVerified && (
                <Button disabled={isPending} onClick={handleReset}>
                    Reset Password
                </Button>
            )}

            {!profile.emailVerified && <p>Your email not verified.</p>}
        </>
    );
}
