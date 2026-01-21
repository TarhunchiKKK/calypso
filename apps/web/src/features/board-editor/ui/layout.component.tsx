import { type HTMLAttributes, type PropsWithChildren, useEffect, useRef } from "react";

function useLayoutFocus() {
    const layoutRef = useRef<HTMLDivElement>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: If extra dependency become removed - this not work as expected
    useEffect(() => {
        if (layoutRef.current) {
            layoutRef.current.focus();
        }

        const handler = () => {
            if (document.visibilityState === "visible") {
                layoutRef.current?.focus();
            }
        };

        window.addEventListener("visibilitychange", handler);

        return () => {
            window.removeEventListener("visibilitychange", handler);
        };
    }, [layoutRef]);

    return layoutRef;
}

type Props = HTMLAttributes<HTMLDivElement> & PropsWithChildren;

export function Layout({ children, ...props }: Props) {
    const layoutRef = useLayoutFocus();

    return (
        <div data-testid="layout" className="grow relative dark:bg-gray-900" {...props} tabIndex={0} ref={layoutRef}>
            {children}
        </div>
    );
}
