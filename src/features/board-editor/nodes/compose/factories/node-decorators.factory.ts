import { DragableNodeDecorator } from "@/features/board-editor/modules/dragging";
import type { Decoratable, NodeBase, Offset, Rect } from "../../../core";
import { EditableNodeDecorator } from "../../../modules/editing";
import type { ResizeHandler } from "../../../modules/resizing";
import { ResizableNodeDecorator } from "../../../modules/resizing/lib/resizable-node.decorator";
import { SelectedNodeDecorator } from "../../../modules/selection";
import { DraggingStrategiesMap } from "../constants/dragging-strategies.map";
import { EditStrategiesMap } from "../constants/edit-strategies.map";
import { ResizeStrategiesMap } from "../constants/resize-strategies.map";
import { WrapperConstructorsMap } from "../constants/wrapper-constructors.map";

export class NodeDecoratorsFactory {
    public static wrap(node: NodeBase) {
        const creator = WrapperConstructorsMap[node.type];
        return creator(node);
    }

    public static select(node: Decoratable) {
        return new SelectedNodeDecorator(node);
    }

    public static dragable(node: Decoratable, offset?: Offset) {
        const strategyCreator = DraggingStrategiesMap[node.type];
        return new DragableNodeDecorator(node, strategyCreator(), offset);
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
