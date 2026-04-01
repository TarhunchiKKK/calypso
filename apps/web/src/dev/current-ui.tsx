import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/factories/node-wrappers.factory";
import { MockNodes } from "./mock-nodes.constant";

export function CurrentUi() {
    const nodes = MockNodes.map((node) =>
        NodeWrappersFactory.wrap(MockNodes, node),
    )
        .map(NodeDecoratorsFactory.selectable)
        .map((node) =>
            NodeDecoratorsFactory.resizable(node, undefined, () => {}),
        );
    return (
        <div className="relative w-screen h-screen">
            {nodes.map((node) => node.render())}
        </div>
    );
}
