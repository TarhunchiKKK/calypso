import type { HTMLAttributes, PropsWithChildren } from "react";

export type ParagraphProps = PropsWithChildren<{
    attributes: HTMLAttributes<HTMLParagraphElement>;
}>;

export function Paragraph(props: ParagraphProps) {
    return <p {...props.attributes}>{props.children}</p>;
}
