import type { NodeStyles } from "@lib/boards";
import { MousePointer2 } from "lucide-react";
import { capitalize } from "@/shared/lib/js";
import type { DropdownItem } from "@/shared/ui";

export const AngleTypePlaceholder = <MousePointer2 className="rotate-90" />;

export function getAngleTypes(values: NodeStyles["angleType"][]): DropdownItem<NodeStyles["angleType"]>[] {
    return values.map((value) => ({
        label: capitalize(value).replace("-", " "),
        value: value
    }));
}
