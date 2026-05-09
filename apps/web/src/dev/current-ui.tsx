import type { DrawingNode } from "@repo/boards-common";
import { BoardEditor } from "@/board-editor";
import type { NodeUiSettings } from "@/board-editor/core";
import { DrawingNodeComponent } from "@/board-editor/nodes/variants/drawing/component";
import { MockNodes } from "./mocks/nodes.mock";

const node: DrawingNode = {
    id: "id",
    type: "drawing",
    locked: false,
    rect: {
        x: 100,
        y: 100,
        width: 100,
        height: 100
    },
    styles: {
        lineColor: "red",
        lineWidth: 16
    },
    points: [
        { x: 0, y: 0 },
        // { x: 20, y: 20 },
        { x: 50, y: 50 },
        { x: 400, y: 400 }
    ]
};

const uiSettings: NodeUiSettings = {
    noPointerEvents: true,
    showContent: true
};

export function CurrentUi() {
    return <DrawingNodeComponent node={node} handlers={{}} uiSettings={uiSettings} />;

    // return <BoardEditor nodes={MockNodes} boardId="aaa" />;
}
