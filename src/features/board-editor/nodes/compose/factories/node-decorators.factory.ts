import { DragableNodeDecorator } from "@/features/board-editor/modules/dragging";
import type { Decoratable, NodeBase, Offset, Rect } from "../../../core";
import { EditableNodeDecorator } from "../../../modules/editing";
import type { ResizeHandler } from "../../../modules/resizing";
import { ResizableNodeDecorator } from "../../../modules/resizing/lib/resizable-node.decorator";
import { SelectableNodeDecorator } from "../../../modules/selection";
import { DraggingStrategiesMap } from "../constants/dragging-strategies.map";
import { EditingStrategiesMap } from "../constants/editiing-strategies.map";
import { ResizingStrategiesMap } from "../constants/resizing-strategies.map";
import { WrapperConstructorsMap } from "../constants/wrapper-constructors.map";

export class NodeDecoratorsFactory {
    public static wrap(node: NodeBase) {
        const creator = WrapperConstructorsMap[node.type];
        return creator(node);
    }

    public static select(node: Decoratable) {
        return new SelectableNodeDecorator(node);
    }

    public static dragable(node: Decoratable, offset?: Offset) {
        const strategyCreator = DraggingStrategiesMap[node.type];
        return new DragableNodeDecorator(node, strategyCreator(), offset);
    }

    public static resizable(node: Decoratable, size?: Rect, handler?: ResizeHandler) {
        const strategyCreator = ResizingStrategiesMap[node.type];
        return new ResizableNodeDecorator(node, strategyCreator(handler), size);
    }

    public static editable(node: Decoratable, handler: (node: NodeBase) => void) {
        const strategyCreator = EditingStrategiesMap[node.type];
        return new EditableNodeDecorator(node, strategyCreator(handler));
    }
}
