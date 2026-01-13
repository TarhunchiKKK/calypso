import { SelectedNodeDecorator } from "../../../modules/selection";
import { Decoratable, NodeBase, Rect } from "../../../core";
import { ResizeHandler } from "../../../modules/resizing";
import { ResizableNodeDecorator } from "../../../modules/resizing/lib/resizable-node.decorator";
import { WrapperConstructorsMap } from "../constants/wrapper-constructors.map";
import { ResizeStrategiesMap } from "../constants/resize-strategies.map";
import { EditStrategiesMap } from "../constants/edit-strategies.map";
import { EditableNodeDecorator } from "../../../modules/editing";

export class NodeDecoratorsFactory {
    public static wrap(node: NodeBase) {
        const creator = WrapperConstructorsMap[node.type];
        return creator(node);
    }

    public static select(node: Decoratable) {
        return new SelectedNodeDecorator(node);
    }

    public static resizable(node: Decoratable, size?: Rect, handler?: ResizeHandler) {
        const strategyCreator = ResizeStrategiesMap[node.type];
        return new ResizableNodeDecorator(node, strategyCreator(handler), size);
    }

    public static editable(node: Decoratable, handler: (node: NodeBase) => void) {
        const strategyCreator = EditStrategiesMap[node.type];
        return new EditableNodeDecorator(node, strategyCreator(handler));
    }
}
