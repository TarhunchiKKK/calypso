import type { Boards, Offset, Rect } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import { BindableNodeDecorator } from "@/board-editor/modules/arrows-binding";
import { DraggableNodeDecorator } from "@/board-editor/modules/dragging";
import { CheckLocked } from "@/board-editor/modules/locking";
import { EditableNodeDecorator } from "../../../modules/editing";
import type { ResizeHandler } from "../../../modules/resizing";
import { ResizableNodeDecorator } from "../../../modules/resizing/lib/resizable-node.decorator";
import { SelectableNodeDecorator } from "../../../modules/selection";
import { BindingStrategiesMap } from "../constants/binding-strategies.map";
import { DraggingStrategiesMap } from "../constants/dragging-strategies.map";
import { EditingStrategiesMap } from "../constants/editing-strategies.map";
import { ResizingStrategiesMap } from "../constants/resizing-strategies.map";

export class NodeDecoratorsFactory {
    @CheckLocked()
    public static select(node: Decoratable): Decoratable {
        return new SelectableNodeDecorator(node);
    }

    @CheckLocked()
    public static draggable(node: Decoratable, offset?: Offset) {
        const strategyCreator = DraggingStrategiesMap[node.type];

        if (!strategyCreator) {
            return node;
        }

        return new DraggableNodeDecorator(node, strategyCreator(), offset);
    }

    @CheckLocked()
    public static resizable(node: Decoratable, size?: Rect, handler?: ResizeHandler) {
        const strategyCreator = ResizingStrategiesMap[node.type];

        if (!strategyCreator) {
            return node;
        }

        return new ResizableNodeDecorator(node, strategyCreator(handler), size);
    }

    @CheckLocked()
    public static editable(node: Decoratable, handler: (node: Boards.NodeBase) => void) {
        const strategyCreator = EditingStrategiesMap[node.type];

        if (!strategyCreator) {
            return node;
        }

        return new EditableNodeDecorator(node, strategyCreator(handler));
    }

    @CheckLocked()
    public static bindable(node: Decoratable) {
        const strategyCreator = BindingStrategiesMap[node.type];

        if (!strategyCreator) {
            return node;
        }

        return new BindableNodeDecorator(
            node,
            strategyCreator(
                node.data,
                () => {},
                () => {}
            )
        );
    }
}
