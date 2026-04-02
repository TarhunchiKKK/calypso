import type { NodeBase } from "@repo/boards-common";
import type { Offset, Rect } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import { NodeBindingDecorator, type BindingNodeHandlers } from "@/board-editor/modules/arrows-binding";
import { NodeDraggingDecorator } from "@/board-editor/modules/dragging";
import { CheckLocked } from "@/board-editor/modules/locking";
import { NodeEditingDecorator } from "../../../modules/editing";
import { type ResizeHandler, NodeResizingDecorator } from "../../../modules/resizing";
import { NodeSelectionDecorator } from "../../../modules/selection";
import { BindingStrategiesMap } from "../constants/binding-strategies.map";
import { DraggingStrategiesMap } from "../constants/dragging-strategies.map";
import { EditingStrategiesMap } from "../constants/editing-strategies.map";
import { ResizingStrategiesMap } from "../constants/resizing-strategies.map";
import { SelectionStrategiesMap } from "../constants/selection-strategies.map";

export class NodeDecoratorsFactory {
    @CheckLocked()
    public static selection(node: Decoratable): Decoratable {
        const strategyCreator = SelectionStrategiesMap[node.type];

        if (!strategyCreator) {
            return node;
        }

        return new NodeSelectionDecorator(node, strategyCreator());
    }

    @CheckLocked()
    public static dragging(node: Decoratable, offset?: Offset) {
        const strategyCreator = DraggingStrategiesMap[node.type];

        if (!strategyCreator) {
            return node;
        }

        return new NodeDraggingDecorator(node, strategyCreator(), offset);
    }

    @CheckLocked()
    public static resizing(node: Decoratable, size?: Rect, handler?: ResizeHandler) {
        const strategyCreator = ResizingStrategiesMap[node.type];

        if (!strategyCreator) {
            return node;
        }

        return new NodeResizingDecorator(node, strategyCreator(handler), size);
    }

    @CheckLocked()
    public static editing(node: Decoratable, handler: (node: NodeBase) => void) {
        const strategyCreator = EditingStrategiesMap[node.type];

        if (!strategyCreator) {
            return node;
        }

        return new NodeEditingDecorator(node, strategyCreator(handler));
    }

    @CheckLocked()
    public static bindable(node: Decoratable, handlers: BindingNodeHandlers) {
        const strategyCreator = BindingStrategiesMap[node.type];

        if (!strategyCreator) {
            return node;
        }

        return new NodeBindingDecorator(node, strategyCreator(node.data, handlers));
    }
}
