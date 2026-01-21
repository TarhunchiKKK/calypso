import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    className?: string;
}>;

const defaultClassName = "bg-white p-1 rounded-md shadow-lg dark:bg-gray-900 dark:shadow-amber-50 dark:shadow-sm";

export function Wrapper({ className, children }: Props) {
    return <div className={`${defaultClassName} ${className}`}>{children}</div>;
}
