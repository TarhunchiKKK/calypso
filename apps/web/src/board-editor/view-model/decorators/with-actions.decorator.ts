import { Geometry } from "@/shared/lib/geometry";
import type { ViewModel, ViewModelParams, ViewState } from "../types";
import { switchToArrowCreatingStart } from "../variants/arrow-creating-start/switcher";
import { switchToIdle } from "../variants/idle/switcher";
import { switchToShapeSelection } from "../variants/shape-selection/switcher";
import { switchToStickersCreation } from "../variants/stickers-creation/switcher";

const idleViewStates: ViewState["type"][] = ["idle", "selection", "selection-window", "dragging"];
const arrowsViewStates: ViewState["type"][] = ["arrow-creating-start", "arrow-creating-end"];
const shapesViewStates: ViewState["type"][] = ["shape-selection", "shapes-creation"];

export function withActions(
    viewState: ViewState,
    setViewState: ViewModelParams["setViewState"],
    viewModel: Omit<ViewModel, "actions">
): ViewModel {
    const isIdle = idleViewStates.includes(viewState.type);
    const isStickers = viewState.type === "stickers-creation";
    const isArrows = arrowsViewStates.includes(viewState.type);
    const isShapes = shapesViewStates.includes(viewState.type);

    const actions: ViewModel["actions"] = {
        idle: {
            isActive: isIdle,
            onClick: !isIdle ? () => setViewState(switchToIdle()) : undefined
        },
        stickers: {
            isActive: isStickers,
            onClick: !isStickers ? () => setViewState(switchToStickersCreation()) : undefined
        },
        arrows: {
            isActive: isArrows,
            onClick: () => setViewState(switchToArrowCreatingStart())
        },
        shapes: {
            isActive: isShapes,
            onClick: e => (!isShapes ? setViewState(switchToShapeSelection(Geometry.pointFromEvent(e))) : undefined)
        }
    };

    return {
        ...viewModel,
        actions
    };
}
