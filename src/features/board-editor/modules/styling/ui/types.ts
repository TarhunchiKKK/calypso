import type { NodeStyles } from "../types";

export type DropdownItem<Key extends keyof NodeStyles> = {
    label: string | number;

    value: NodeStyles[Key];
};
