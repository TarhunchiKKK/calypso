import { toast } from "sonner";
import { useTimer } from "@/shared/model";
import { Button } from "@/shared/ui/kit";
import { PasswordRecoveryApi } from "../api";

const LOCAL_STORAGE_KEY = "password-recovery-timer";
const INTERVAL = 60;

export function UpdatePasswordButton() {
    const { mutateAsync, isPending } = PasswordRecoveryApi.useReset();

    const timer = useTimer({
        key: LOCAL_STORAGE_KEY,
        seconds: INTERVAL
    });

    const handleReset = async () => {
        await mutateAsync();

        toast("Check your email");

        timer.trigger();
    };

    return (
        <div className="space-y-4">
            <Button disabled={isPending} onClick={handleReset}>
                Reset Password
            </Button>

            {timer.isPending && <p className="text-secondary">You can retry after {timer.timeLeft} seconds</p>}
        </div>
    );
}
