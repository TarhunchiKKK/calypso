import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { EmailVerificationApi } from "@/features/email-verification";

function EmailVerificationPage() {
    const { token } = useParams();
    const verify = EmailVerificationApi.useVerify({
        onSuccess: () => {
            toast.success("Email successfully verified");
        },
        onError: () => {
            toast.error("Error via email verifying");
        }
    });

    useEffect(() => {
        async function verifyEmail() {
            if (!token) {
                throw new Error("Token not provided");
            }

            await verify.mutateAsync(token);
        }

        verifyEmail();
    }, [token, verify]);

    return null;
}

export const Component = EmailVerificationPage;
