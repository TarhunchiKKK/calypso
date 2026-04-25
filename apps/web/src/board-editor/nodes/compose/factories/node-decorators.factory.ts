import type { NodeBase } from "@repo/boards-common";
import type { Offset, Rect } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import { type BindingNodeHandlers, NodeBindingDecorator } from "@/board-editor/modules/arrows-binding";
import { NodeDraggingDecorator } from "@/board-editor/modules/dragging";
import { CheckLocked, NodeLockingDecorator } from "@/board-editor/modules/locking";
import { NodeEditingDecorator } from "../../../modules/editing";
import { NodeResizingDecorator, ResizableNodeDecorator, type ResizeHandler } from "../../../modules/resizing";
import { NodeSelectionDecorator } from "../../../modules/selection";
import { BindingStrategiesMap } from "../constants/binding-strategies.map";
import { DraggingStrategiesMap } from "../constants/dragging-strategies.map";
import { EditingStrategiesMap } from "../constants/editing-strategies.map";
import { LockingStrategiesMap } from "../constants/locking-strategies.map";
import { ResizableStrategiesMap } from "../constants/resizable-strategies.map";
import { ResizingStrategiesMap } from "../constants/resizing-strategies.map";
import { SelectionStrategiesMap } from "../constants/selection-strategies.map";

export class NodeDecoratorsFactory {
    public static selection(node: Decoratable): Decoratable {
        if (node.data.locked) {
            const strategyCreator = LockingStrategiesMap[node.type];

            if (!strategyCreator) {
                return node;
            }

            return new NodeLockingDecorator(node, strategyCreator());
        }

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
    public static resizable(node: Decoratable, handler: ResizeHandler) {
        const strategyCreator = ResizableStrategiesMap[node.type];

        if (!strategyCreator) {
            return node;
        }

        return new ResizableNodeDecorator(node, strategyCreator(handler));
    }

    @CheckLocked()
    public static resizing(node: Decoratable, size?: Rect) {
        const strategyCreator = ResizingStrategiesMap[node.type];

        if (!strategyCreator) {
            return node;
        }

        return new NodeResizingDecorator(node, strategyCreator(), size);
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

        return new NodeBindingDecorator(node, strategyCreator(handlers));
    }
}
