import { useCallback, useRef } from "react";

export function useIntersection(onIntersect: () => void) {
    const unsubscribeRef = useRef(() => {});

    return useCallback(
        (el: HTMLDivElement | null) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((intersection) => {
                    if (intersection.isIntersecting) {
                        onIntersect();
                    }
                });
            });

            if (el) {
                observer.observe(el);
                unsubscribeRef.current = () => observer.disconnect();
            } else {
                unsubscribeRef.current();
            }
        },
        [onIntersect]
    );
}
