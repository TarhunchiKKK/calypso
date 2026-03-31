import type { Boards, Offset, Rect } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import { DraggableNodeDecorator } from "@/board-editor/modules/dragging";
import { CheckLocked } from "@/board-editor/modules/locking";
import { EditableNodeDecorator } from "../../../modules/editing";
import type { ResizeHandler } from "../../../modules/resizing";
import { ResizableNodeDecorator } from "../../../modules/resizing/lib/resizable-node.decorator";
import { SelectableNodeDecorator } from "../../../modules/selection";
import { DraggingStrategiesMap } from "../constants/dragging-strategies.map";
import { EditingStrategiesMap } from "../constants/editing-strategies.map";
import { ResizingStrategiesMap } from "../constants/resizing-strategies.map";
import { WrapperConstructorsMap } from "../constants/wrapper-constructors.map";

export class NodeDecoratorsFactory {
    public static wrap(node: Boards.NodeBase) {
        const wrapperCreator = WrapperConstructorsMap[node.type];

        return wrapperCreator(node);
    }

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
}
