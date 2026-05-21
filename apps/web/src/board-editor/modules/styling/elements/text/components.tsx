import type { NodeStyles } from "@repo/boards";
import { Dropdown } from "@/shared/ui";
import type { ElementProps } from "../../lib/types";
import { getTextAligns, TextAlignPlaceholder } from "./constants";

export function TextAlign({ values, update }: ElementProps<"textAlign">) {
    const textAligns = getTextAligns(values);

    const handleSelect = (textAlign: NodeStyles["textAlign"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                textAlign
            }
        }));
    };

    return <Dropdown title="Text Align" items={textAligns} placeholder={TextAlignPlaceholder} onSelect={handleSelect} />;
}
