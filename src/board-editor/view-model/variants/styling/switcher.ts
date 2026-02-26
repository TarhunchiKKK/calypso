import type { Point } from "@/shared/lib/geometry";
import type { StylingViewState } from "./view-state";

type Params = {
    selectedIds: Set<string>;

    position: Point;
};

export function switchToStyling(params: Params): StylingViewState {
    return {
        ...params,
        type: "styling"
    };
}
