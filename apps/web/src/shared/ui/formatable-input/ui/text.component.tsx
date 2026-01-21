import type { HTMLAttributes, PropsWithChildren } from "react";

type TextProps = PropsWithChildren<{
    attributes: HTMLAttributes<HTMLSpanElement>;
}>;

export function Text(props: TextProps) {
    return <span {...props.attributes}>{props.children}</span>;
}
