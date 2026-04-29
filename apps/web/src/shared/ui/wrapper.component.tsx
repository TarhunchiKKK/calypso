import type { CSSProperties, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    className?: string;

    style?: CSSProperties;
}>;

const defaultClassName = "bg-white p-1 rounded-md shadow-lg dark:shadow-amber-50 dark:bg-black dark:shadow-sm";

export function Wrapper({ style, className, children }: Props) {
    return (
        <div style={style} className={`${defaultClassName} ${className}`}>
            {children}
        </div>
    );
}
