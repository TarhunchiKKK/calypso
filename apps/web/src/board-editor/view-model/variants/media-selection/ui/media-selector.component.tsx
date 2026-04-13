import type { CSSProperties } from "react";

type Props = {
    style: CSSProperties;

    onSelect: (url: string) => void;
};

export function MediaSelector() {}
