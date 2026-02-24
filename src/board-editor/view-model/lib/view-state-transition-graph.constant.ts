import type { ViewState } from "../types";

export class ViewStateTransitionGraph {
    private static readonly graph: Record<ViewState["type"], ViewState["type"][]> = {
        idle: [],
        "stickers-creation": [],
        "shape-selection": [],
        "shapes-creation": [],
        selection: [],
        "selection-window": [],
        styling: [],
        "nodes-context-menu": [],
        dragging: [],
        editing: [],
        resizing: []
    };

    public static ableTo(from: ViewState["type"], to: ViewState["type"]) {
        return ViewStateTransitionGraph.graph[from].includes(to);
    }
}
