import type { PropsWithChildren } from "react";

export function StylesGroupWrapper({ children }: PropsWithChildren) {
    return <div className="flex flex-row justify-between items-center gap-2">{children}</div>;
}
