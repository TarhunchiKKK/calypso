import type { NodeStyles } from "@repo/boards-common";
import { Dropdown } from "@/shared/ui";
import type { ElementProps } from "../../lib/types";
import { AngleTypePlaceholder, AngleTypes } from "./constants";

export function AngleType({ update }: ElementProps) {
    const handleSelect = (angletype: NodeStyles["angleType"]) => {
        update(node => ({
            ...node,
            styles: {
                ...node.styles,
                angletype
            }
        }));
    };

    return <Dropdown title="Angle Style" items={AngleTypes} placeholder={AngleTypePlaceholder} onSelect={handleSelect} />;
}
