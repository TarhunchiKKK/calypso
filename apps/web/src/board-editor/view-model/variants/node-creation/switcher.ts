import type { OmitFields } from "@repo/common";
import { NodesFactory } from "@/entities/nodes";
import { switchToEditing } from "../editing/switcher";
import { switchToIdle } from "../idle/switcher";
import type { NodeCreationPayload, NodeCreationViewState } from "./view-state";

/**
 * This object contains actions different for particular node type instance creation.
 */
const HandlersRecord: Record<NodeCreationViewState["payload"]["type"], OmitFields<NodeCreationViewState, "type" | "payload">> = {
    sticker: {
        createNode: clickPoint => NodesFactory.sticker({ point: clickPoint })
    },
    arrow: {
        createNode: clickPoint => NodesFactory.arrow({ point: clickPoint })
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
                throw new Error(`Expect type="shape", but got "${viewState.payload.type}"`);
            }

            return NodesFactory.shape({
                point: clickPint,
                variant: viewState.payload.variant
            });
        }
    },
    media: {
        createNode: (clickPoint, viewState) => {
            if (viewState.payload.type !== "media") {
                throw new Error(`Expect type="media", but got "${viewState.payload.type}"`);
            }

            return NodesFactory.media({
                point: clickPoint,
                url: viewState.payload.url
            });
        },
        afterCreate: (_, params) => {
            params.setViewState(switchToIdle());
        }
    },
    note: {
        createNode: clickPoint => NodesFactory.note({ point: clickPoint }),
        afterCreate: (_, params) => {
            params.setViewState(switchToIdle());
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
