import type { NodeBase, Offset, Rect } from "@repo/common";
import { CheckBlocked } from "@/features/board-editor/modules/blocking";
import { DraggableNodeDecorator } from "@/features/board-editor/modules/dragging";
import type { Decoratable } from "../../../core";
import { EditableNodeDecorator } from "../../../modules/editing";
import type { ResizeHandler } from "../../../modules/resizing";
import { ResizableNodeDecorator } from "../../../modules/resizing/lib/resizable-node.decorator";
import { SelectableNodeDecorator } from "../../../modules/selection";
import { DraggingStrategiesMap } from "../constants/dragging-strategies.map";
import { EditingStrategiesMap } from "../constants/editing-strategies.map";
import { ResizingStrategiesMap } from "../constants/resizing-strategies.map";
import { WrapperConstructorsMap } from "../constants/wrapper-constructors.map";

export class NodeDecoratorsFactory {
    public static wrap(node: NodeBase) {
        const wrapperCreator = WrapperConstructorsMap[node.type];
        return wrapperCreator(node);
    }

    @CheckBlocked()
    public static select(node: Decoratable): Decoratable {
        return new SelectableNodeDecorator(node);
    }

    // FIX: typo
    @CheckBlocked()
    public static dragable(node: Decoratable, offset?: Offset) {
        const strategyCreator = DraggingStrategiesMap[node.type];
        return new DraggableNodeDecorator(node, strategyCreator(), offset);
    }

    @CheckBlocked()
    public static resizable(node: Decoratable, size?: Rect, handler?: ResizeHandler) {
        const strategyCreator = ResizingStrategiesMap[node.type];
        return new ResizableNodeDecorator(node, strategyCreator(handler), size);
    }

    @CheckBlocked()
    public static editable(node: Decoratable, handler: (node: NodeBase) => void) {
        const strategyCreator = EditingStrategiesMap[node.type];
        return new EditableNodeDecorator(node, strategyCreator(handler));
    }
}
