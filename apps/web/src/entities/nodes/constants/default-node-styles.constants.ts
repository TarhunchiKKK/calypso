import type { NodeStyles } from "@repo/boards";
import { AvailableBorderRadiuses, AvailableColors, AvailableFontFamilies, AvailableFontSizes } from "./available-node-styles.constants";

export const DefaultNodeStyles: NodeStyles = {
    fontFamily: AvailableFontFamilies[0],
    fontSize: AvailableFontSizes[2],
    backgroundColor: AvailableColors[3],
    textColor: AvailableColors[14],
    borderStyle: "none",
    borderColor: AvailableColors[0],
    borderRadius: AvailableBorderRadiuses[0],
    textAlign: "left",
    angleType: "corner",
    lineColor: "black",
    lineType: "solid",
    lineWidth: 1
};
