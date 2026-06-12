import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { EmailVerificationApi } from "@/features/email-verification";

function EmailVerificationPage() {
    const { token } = useParams();
    const verify = EmailVerificationApi.useVerify();

    useEffect(() => {
        async function verifyEmail() {
            if (!token) {
                throw new Error("Token not provided");
            }

            await verify.mutateAsync(token);

            toast.success("Email successfully verified");
        }

        verifyEmail();
    }, [token, verify]);
}

export const Component = EmailVerificationPage;
