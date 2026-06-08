import type { NodeStyles } from "@lib/boards";
import { Dropdown } from "@/shared/ui";
import type { ElementProps } from "../../lib/types";
import { AngleTypePlaceholder, getAngleTypes } from "./constants";

export function AngleType({ values, update }: ElementProps<"angleType">) {
    const angleTypes = getAngleTypes(values);

    const handleSelect = (angleType: NodeStyles["angleType"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                angleType
            }
        }));
    };

    return <Dropdown title="Angle Type" items={angleTypes} placeholder={AngleTypePlaceholder} onSelect={handleSelect} />;
}
