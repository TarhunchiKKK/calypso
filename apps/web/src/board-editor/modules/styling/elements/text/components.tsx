import type { NodeStyles } from "@repo/boards-common";
import { Dropdown } from "@/shared/ui";
import type { ElementProps } from "../../lib/types";
import { TextAlignPlaceholder, TextAligns } from "./constants";

export function TextAlign({ update }: ElementProps) {
    const handleSelect = (textAlign: NodeStyles["textAlign"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                textAlign
            }
        }));
    };

    return <Dropdown title="Text Align" items={TextAligns} placeholder={TextAlignPlaceholder} onSelect={handleSelect} />;
}
