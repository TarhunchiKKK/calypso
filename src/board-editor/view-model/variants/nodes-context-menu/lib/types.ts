import type { HotKey } from "@/shared/lib/hot-keys";

export type ContextMenuOption = {
    label: string;

    hotKey?: HotKey;

    onClick: () => void;
};

export type ContextMenuOptionsGroup = {
    label?: string;

    options: ContextMenuOption[];
};
