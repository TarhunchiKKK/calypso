import type { HTMLAttributes, PropsWithChildren } from "react";

type ParagraphProps = PropsWithChildren<{
    attributes: HTMLAttributes<HTMLParagraphElement>;
}>;

export function Paragraph(props: ParagraphProps) {
    return <p {...props.attributes}>{props.children}</p>;
}
