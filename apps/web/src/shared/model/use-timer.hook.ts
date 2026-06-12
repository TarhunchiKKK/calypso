import { useCallback, useEffect, useRef, useState } from "react";

type Params = {
    key: string;

    seconds: number;
};

export function useTimer({ key, seconds }: Params) {
    const getRemainingTime = useCallback((): number => {
        const deadlineStr = localStorage.getItem(key);

        if (!deadlineStr) {
            return 0;
        }

        const deadline = parseInt(deadlineStr, 10);

        const remaining = Math.ceil((deadline - Date.now()) / 1000);

        return remaining > 0 ? remaining : 0;
    }, [key]);

    const [timeLeft, setTimeLeft] = useState(getRemainingTime);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startCountdown = useCallback(
        (seconds: number) => {
            clearTimer();
            setTimeLeft(seconds);

            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearTimer();
                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);
        },
        [clearTimer]
    );

    const triggerCountdown = useCallback(() => {
        const deadline = Date.now() + seconds * 1000;

        localStorage.setItem(key, deadline.toString());

        startCountdown(seconds);
    }, [key, startCountdown, seconds]);

    // Check state on component mount
    useEffect(() => {
        const initialRemaining = getRemainingTime();

        if (initialRemaining > 0) {
            startCountdown(initialRemaining);
        } else {
            localStorage.removeItem(key);
        }

        return () => {
            clearTimer();
        };
    }, [clearTimer, startCountdown, getRemainingTime, key]);

    // Timer left - clear localStorage
    useEffect(() => {
        if (timeLeft === 0) {
            localStorage.removeItem(key);
        }
    }, [timeLeft, key]);

    return {
        timeLeft,
        isPending: timeLeft > 0,
        trigger: triggerCountdown
    };
}
