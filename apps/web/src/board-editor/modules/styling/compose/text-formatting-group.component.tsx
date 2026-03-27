import { Dropdown } from "@/shared/ui";
import { TextAlignPlaceholder } from "../constants/placeholders.constants";
import { TextAligns } from "../constants/text-formatting.constants";
import type { UpdateFn } from "../lib/types";
import { StylesGroupWrapper } from "../ui/styles-group-wrapper.component";
import type { Boards } from "@repo/common";

type Props = {
    onUpdate: (fn: UpdateFn) => void;
};

export function TextFormattingGroup({ onUpdate }: Props) {
    const handleTextAlignSelected = (textAlign: Boards.NodeStyles["textAlign"]) => {
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
