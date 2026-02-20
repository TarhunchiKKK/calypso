import { Type } from "lucide-react";
import { Colors, ColorsDropdownItemSizes } from "../constants";
import type { UpdateFn } from "../types";
import { ColorsDropdown } from "../ui/colors-dropdown.component";
import { StylesGroupWrapper } from "./styles-group-wrapper.component";

type Props = {
    onUpdate: (fn: UpdateFn) => void;
};

export function ColorsGroup({ onUpdate }: Props) {
    return (
        <StylesGroupWrapper>
            <ColorsDropdown
                title="Background"
                placeholder={<div className="w-5 h-5 rounded-full" style={{ backgroundColor: Colors[0] }} />}
                renderItem={backgroundColor => <div className="w-5 h-5 rounded-full" style={{ backgroundColor, ...ColorsDropdownItemSizes }} />}
                onSelect={backgroundColor => onUpdate(node => ({ ...node, styles: { ...node.styles, backgroundColor } }))}
            />

            <ColorsDropdown
                title="Text Color"
                placeholder={<Type style={{ color: Colors[0] }} />}
                renderItem={color => <Type style={{ color, ...ColorsDropdownItemSizes }} />}
                onSelect={color => onUpdate(node => ({ ...node, styles: { ...node.styles, color } }))}
            />
        </StylesGroupWrapper>
    );
}
