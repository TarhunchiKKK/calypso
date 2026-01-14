import type { HTMLAttributes, PropsWithChildren } from "react";

export type TextProps = PropsWithChildren<{
    attributes: HTMLAttributes<HTMLSpanElement>;
}>;

export function Text(props: TextProps) {
    return <span {...props.attributes}>{props.children}</span>;
}
