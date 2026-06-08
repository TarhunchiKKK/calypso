import type { NodeStyles } from "@lib/boards";
import { CommonNodeStyles } from "./common-node-styles.constants";

export const DefaultNodeStyles: NodeStyles = {
    fontFamily: CommonNodeStyles.fontFamily[0],
    fontSize: 8,
    backgroundColor: CommonNodeStyles.backgroundColor[3],
    textColor: CommonNodeStyles.textColor[14],
    borderStyle: "none",
    borderColor: CommonNodeStyles.borderColor[0],
    borderRadius: 0,
    textAlign: "left",
    angleType: "corner",
    lineColor: "black",
    lineType: "solid",
    lineWidth: 1
};
