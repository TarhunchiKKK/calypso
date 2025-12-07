import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export function Layout({ children }: Props) {
    return (
        <div data-testid="layout" className="grow relative">
            {children}
        </div>
    );
}
