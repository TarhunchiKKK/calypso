import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import { MockNodes } from "./mock-nodes.constant";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/factories/node-wrappers.factory";

export function CurrentUi() {
    const nodes = MockNodes.map(node => NodeWrappersFactory.wrap(MockNodes, node)).map(
        NodeDecoratorsFactory.selectable
    );
    return <div className="relative w-screen h-screen">{nodes.map(node => node.render())}</div>;
}
