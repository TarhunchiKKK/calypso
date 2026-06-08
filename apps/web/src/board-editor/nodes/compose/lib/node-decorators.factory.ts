import type { Offset, Rect } from "@lib/common";
import type { Decoratable } from "@/board-editor/core";
import { BindableNodeDecorator, type BindingNodeHandlers, NodeBindingDecorator } from "@/board-editor/modules/arrows-binding";
import { NodeDraggingDecorator } from "@/board-editor/modules/dragging";
import { CheckLocked, NodeLockingDecorator } from "@/board-editor/modules/locking";
import { NodeEditingDecorator, type NodeEditingHandlers } from "../../../modules/editing";
import { NodeResizingDecorator, ResizableNodeDecorator, type ResizeHandler } from "../../../modules/resizing";
import { NodeSelectionDecorator } from "../../../modules/selection";
import { BindableStrategiesMap } from "../constants/bindable-strategies.map";
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
            const strategy = LockingStrategiesMap[node.data.type];

            if (!strategy) {
                return node;
            }

            return new NodeLockingDecorator(node, strategy);
        }

        const strategy = SelectionStrategiesMap[node.data.type];

        if (!strategy) {
            return node;
        }

        return new NodeSelectionDecorator(node, strategy);
    }

    @CheckLocked()
    public static dragging(node: Decoratable, offset?: Offset) {
        const strategy = DraggingStrategiesMap[node.data.type];

        if (!strategy) {
            return node;
        }

        return new NodeDraggingDecorator(node, strategy, offset);
    }

    @CheckLocked()
    public static resizable(node: Decoratable, handler: ResizeHandler) {
        const strategy = ResizableStrategiesMap[node.data.type];

        if (!strategy) {
            return node;
        }

        return new ResizableNodeDecorator(node, strategy, handler);
    }

    @CheckLocked()
    public static resizing(node: Decoratable, size?: Rect) {
        const strategy = ResizingStrategiesMap[node.data.type];

        if (!strategy) {
            return node;
        }

        return new NodeResizingDecorator(node, strategy, size);
    }

    @CheckLocked()
    public static editing(node: Decoratable, handlers: NodeEditingHandlers) {
        const strategy = EditingStrategiesMap[node.data.type];

        if (!strategy) {
            return node;
        }

        return new NodeEditingDecorator(node, strategy, handlers);
    }

    @CheckLocked()
    public static bindable(node: Decoratable, handlers: BindingNodeHandlers, active: boolean) {
        const strategy = BindableStrategiesMap[node.data.type];

        if (!strategy) {
            return node;
        }

        return new BindableNodeDecorator(node, strategy, handlers, active);
    }

    @CheckLocked()
    public static binding(node: Decoratable) {
        const strategy = BindingStrategiesMap[node.data.type];

        if (!strategy) {
            return node;
        }

        return new NodeBindingDecorator(node, strategy);
    }
}
