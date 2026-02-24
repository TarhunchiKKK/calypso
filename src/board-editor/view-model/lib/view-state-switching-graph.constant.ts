import type { ViewState } from "../types";

// DELETE: maybe this class is useless
export class ViewStateSwitchingGraph {
    private static readonly graph: Record<ViewState["type"], ViewState["type"][]> = {
        idle: ["selection", "selection-window", "dragging", "editing", "styling", "nodes-context-menu"],
        selection: ["idle", "selection-window", "dragging", "editing", "resizing", "styling", "nodes-context-menu"],
        "selection-window": [],
        "stickers-creation": ["idle"],
        "shape-selection": [],
        "shapes-creation": [],
        styling: [],
        "nodes-context-menu": [],
        dragging: [],
        editing: [],
        resizing: []
    };

    public static ableToSwitch(from: ViewState["type"], to: ViewState["type"]) {
        return ViewStateSwitchingGraph.graph[from].includes(to);
    }
}
