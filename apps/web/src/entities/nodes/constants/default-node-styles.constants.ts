import type { Boards } from "@repo/common";
import {
    AvailableBorderRadiuses,
    AvailableColors,
    AvailableFontFamilies,
    AvailableFontSizes
} from "./available-node-styles.constants";

export const DefaultNodeStyles: Boards.NodeStyles = {
    fontFamily: AvailableFontFamilies[0],
    fontSize: AvailableFontSizes[2],
    backgroundColor: AvailableColors[0],
    color: AvailableColors[0],
    borderStyle: "none",
    borderColor: "",
    borderRadius: AvailableBorderRadiuses[0],
    textAlign: "left"
};
