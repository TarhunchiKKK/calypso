import { Type } from "lucide-react";
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
                onSelect={backgroundColor => onUpdate(node => ({ ...node, styles: { ...node.styles, backgroundColor } }))}
                renderItem={backgroundColor => <div className="w-5 h-5 rounded-full" style={{ backgroundColor }} />}
            />

            <ColorsDropdown
                title="Text Color"
                renderItem={color => <Type style={{ color }} />}
                onSelect={color => onUpdate(node => ({ ...node, styles: { ...node.styles, color } }))}
            />
        </StylesGroupWrapper>
    );
}
