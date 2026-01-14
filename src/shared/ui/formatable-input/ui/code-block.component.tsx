import type { HTMLAttributes, PropsWithChildren } from "react";

export type CodeBlockProps = PropsWithChildren<{
    attributes: HTMLAttributes<HTMLPreElement>;
}>;

export function CodeBlock(props: CodeBlockProps) {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
}
