import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export function Overlay(props: Props) {
    return <div data-test-id="overlay" {...props} className="absolute inset-0"></div>;
}
