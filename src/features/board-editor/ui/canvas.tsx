import { HTMLAttributes, PropsWithChildren, ReactNode, Ref } from "react";

type Props = HTMLAttributes<HTMLDivElement> &
    PropsWithChildren<{
        ref: Ref<HTMLDivElement>;

        overlay?: ReactNode;
    }>;

export function Canvas({ ref, overlay, children, ...props }: Props) {
    return (
        <div ref={ref} className="absolute  select-none overflow-hidden" {...props}>
            {overlay}

            {children}
        </div>
    );
}
