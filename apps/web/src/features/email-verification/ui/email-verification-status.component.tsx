import { toast } from "sonner";
import { AuthApi } from "@/features/auth";
import { Button, Checkbox } from "@/shared/ui/kit";
import { EmailVerificationApi } from "../api/email-verification.api";

export function EmailVerificationStatus() {
    const { data: profile } = AuthApi.useProfile();

    const { mutateAsync, isPending } = EmailVerificationApi.useSend();

    if (!profile) {
        return null;
    }

    const handleSend = async () => {
        await mutateAsync();

        toast("Check you email");
    };

    return (
        <>
            {profile.emailVerified && (
                <p>
                    <Checkbox checked={true} /> You email already verified.
                </p>
            )}

            {!profile.emailVerified && (
                <Button disabled={isPending} onClick={handleSend}>
                    Verify email
                </Button>
            )}
        </>
    );
}
