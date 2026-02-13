import type { Point } from "@repo/common";
import type { StylingViewState } from "./view-state";

type Params = {
    selectedIds: Set<string>;

    barPosition: Point;
};

export function switchToStyling(params: Params): StylingViewState {
    return {
        ...params,
        type: "styling"
    };
}
