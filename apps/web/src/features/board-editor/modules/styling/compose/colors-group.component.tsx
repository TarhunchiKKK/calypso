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
                placeholder={<div className="w-5 h-5 rounded-full" style={{ backgroundColor: "red" }} />}
                onSelect={backgroundColor => onUpdate(node => ({ ...node, styles: { ...node.styles, backgroundColor } }))}
                renderItem={backgroundColor => <div className="w-5 h-5 rounded-full" style={{ backgroundColor, width: 20, height: 20 }} />}
            />

            <ColorsDropdown
                title="Text Color"
                placeholder={<Type style={{ color: "red" }} />}
                renderItem={color => <Type style={{ color, width: 20, height: 20 }} />}
                onSelect={color => onUpdate(node => ({ ...node, styles: { ...node.styles, color } }))}
            />
        </StylesGroupWrapper>
    );
}
