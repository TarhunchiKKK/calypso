import type { Id, Point } from "@repo/common";
import type { StylingViewState } from "./view-state";

type Params = {
    selectedIds: Set<Id>;

    position: Point;
};

export function switchToStyling(params: Params): StylingViewState {
    return {
        ...params,
        type: "styling"
    };
}
