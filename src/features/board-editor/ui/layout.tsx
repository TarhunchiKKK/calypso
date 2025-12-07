import { HTMLAttributes, PropsWithChildren } from "react";

type Props = HTMLAttributes<HTMLDivElement> & PropsWithChildren;

export function Layout({ children, ...props }: Props) {
    return (
        <div data-testid="layout" className="grow relative" {...props} tabIndex={0}>
            {children}
        </div>
    );
}
