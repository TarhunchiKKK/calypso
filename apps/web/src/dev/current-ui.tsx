import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import { MockNodes } from "./mock-nodes.constant";

export function CurrentUi() {
    const nodes = MockNodes.map(NodeDecoratorsFactory.wrap).map(NodeDecoratorsFactory.bindable);
    return <div className="relative w-screen h-screen">{nodes.map(node => node.render())}</div>;
}
