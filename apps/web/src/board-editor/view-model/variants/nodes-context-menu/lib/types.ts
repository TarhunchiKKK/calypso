import type { HotKey } from "@/shared/lib/hot-keys";

export type ContextMenuOption = {
    label: string;

    hotKey?: HotKey;

    onClick: () => void;

    destructive?: boolean;
};

export type ContextMenuOptionsGroup = {
    label?: string;

    options: ContextMenuOption[];
};
