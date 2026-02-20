import { ALargeSmall } from "lucide-react";
import { NumericDropdown } from "@/shared/ui";
import { FontSizes } from "../constants";
import type { UpdateFn } from "../types";
import { FontFamilyDropdown } from "../ui/font-family-dropdown.component";
import { StylesGroupWrapper } from "./styles-group-wrapper.component";

type Props = {
    onUpdate: (fn: UpdateFn) => void;
};

export function FontStylesGroup({ onUpdate }: Props) {
    return (
        <StylesGroupWrapper>
            <FontFamilyDropdown onSelect={fontFamily => onUpdate(node => ({ ...node, styles: { ...node.styles, fontFamily } }))} />

            <NumericDropdown
                title="Font Size"
                placeholder={<ALargeSmall className="dark:text-white" />}
                items={FontSizes}
                onSelect={fontSize => onUpdate(node => ({ ...node, styles: { ...node.styles, fontSize } }))}
            />
        </StylesGroupWrapper>
    );
}
