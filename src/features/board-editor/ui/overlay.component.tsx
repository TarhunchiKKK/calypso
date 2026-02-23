import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export function Overlay(props: Props) {
    return <div {...props} className="absolute inset-0"></div>;
}
