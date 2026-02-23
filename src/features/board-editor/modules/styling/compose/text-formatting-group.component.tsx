import { TextAlignStart } from "lucide-react";
import { Dropdown } from "@/shared/ui";
import { TextAligns } from "../constants/text-formatting.constants";
import type { UpdateFn } from "../types";
import { StylesGroupWrapper } from "../ui/styles-group-wrapper.component";
import type { NodeStyles } from "@/features/board-editor/core";

type Props = {
    onUpdate: (fn: UpdateFn) => void;
};

export function TextFormattingGroup({ onUpdate }: Props) {
    const handleTextAlignSelected = (textAlign: NodeStyles["textAlign"]) => {
        onUpdate(node => ({
            ...node,
            styles: {
                ...node.styles,
                textAlign
            }
        }));
    };

    return (
        <StylesGroupWrapper>
            <Dropdown title="Text Align" items={TextAligns} placeholder={<TextAlignStart className="dark:text-white" />} onSelect={handleTextAlignSelected} />
        </StylesGroupWrapper>
    );
}
