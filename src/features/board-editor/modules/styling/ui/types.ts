import type { NodeStyles } from "../types";

export type DropdownItem<Key extends keyof NodeStyles> = {
    label: string;

    value: NodeStyles[Key];
};
