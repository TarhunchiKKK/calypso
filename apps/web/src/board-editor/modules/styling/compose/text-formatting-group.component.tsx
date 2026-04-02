import type { NodeStyles } from "@repo/boards-common";
import { Dropdown } from "@/shared/ui";
import { TextAlignPlaceholder } from "../constants/placeholders.constants";
import { TextAligns } from "../constants/text-formatting.constants";
import type { UpdateFn } from "../lib/types";
import { StylesGroupWrapper } from "../ui/styles-group-wrapper.component";

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
            <Dropdown
                title="Text Align"
                items={TextAligns}
                placeholder={TextAlignPlaceholder}
                onSelect={handleTextAlignSelected}
            />
        </StylesGroupWrapper>
    );
}
