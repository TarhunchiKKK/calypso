import type { NodeTypes } from "@repo/boards-common";
import type { OmitFields } from "@repo/common";
import { NodesFactory } from "@/board-editor/nodes";
import { switchToArrowBinding } from "../arrow-binding/switcher";
import { switchToEditing } from "../editing/switcher";
import type { NodeCreationPayload, NodeCreationViewState } from "./view-state";

const HandlersRecord: Record<NodeTypes, OmitFields<NodeCreationViewState, "type" | "payload">> = {
    sticker: {
        createNode: clickPoint => NodesFactory.sticker({ point: clickPoint })
    },
    arrow: {
        createNode: clickPoint => NodesFactory.arrow({ start: clickPoint, end: clickPoint }),
        afterCreate: (arrow, params) => {
            params.setViewState(
                switchToArrowBinding({
                    nodeId: arrow.id,
                    direction: "n"
                })
            );
        }
    },
    text: {
        createNode: clickPoint => NodesFactory.text({ point: clickPoint }),
        afterCreate: (textNode, params) => {
            params.setViewState(switchToEditing({ selectedNodeId: textNode.id }));
        }
    },
    shape: {
        createNode: (clickPint, viewState) => {
            if (viewState.payload.type !== "shape") {
                throw new Error(`Expect type="shape", but got ${viewState.payload.type}`);
            }

            return NodesFactory.shape({
                point: clickPint,
                variant: viewState.payload.variant
            });
        }
    }
};

export function switchToNodeCreation(payload: NodeCreationPayload): NodeCreationViewState {
    const handlers = HandlersRecord[payload.type];

    return {
        type: "node-creation",
        payload: payload,
        ...handlers
    };
}
