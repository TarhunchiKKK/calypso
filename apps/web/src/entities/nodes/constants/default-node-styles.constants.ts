import type { NodeStyles } from "@repo/boards-common";
import { AvailableBorderRadiuses, AvailableColors, AvailableFontFamilies, AvailableFontSizes } from "./available-node-styles.constants";

export const DefaultNodeStyles: NodeStyles = {
    fontFamily: AvailableFontFamilies[0],
    fontSize: AvailableFontSizes[2],
    backgroundColor: AvailableColors[0],
    textColor: AvailableColors[0],
    borderStyle: "none",
    borderColor: AvailableColors[0],
    borderRadius: AvailableBorderRadiuses[0],
    textAlign: "left",
    angleType: "corner",
    lineColor: "blue",
    lineType: "solid",
    lineWidth: 1
};
