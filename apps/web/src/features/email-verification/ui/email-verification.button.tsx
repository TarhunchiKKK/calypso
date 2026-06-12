import { toast } from "sonner";
import { useTimer } from "@/shared/model";
import { Button } from "@/shared/ui/kit";
import { EmailVerificationApi } from "../api";

const LOCAL_STORAGE_KEY = "email-verification-timer";
const INTERVAL = 60;

export function EmailVerificationButton() {
    const { mutateAsync, isPending } = EmailVerificationApi.useSend();

    const timer = useTimer({
        key: LOCAL_STORAGE_KEY,
        seconds: INTERVAL
    });

    const handleSend = async () => {
        await mutateAsync();

        toast("Check your email");

        timer.trigger();
    };

    return (
        <div className="space-y-4">
            <Button disabled={isPending} onClick={handleSend}>
                Verify Email
            </Button>

            {timer.isPending && <p className="text-secondary">You can retry after {timer.timeLeft} seconds</p>}
        </div>
    );
}
