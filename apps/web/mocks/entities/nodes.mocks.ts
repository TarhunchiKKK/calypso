import type { ArrowNode, NodeStyles, NodeTypes, StickerNode } from "@repo/boards-common";
import { MockRect } from "../shared/geometry.mocks.js";

export const MockNodeStyles: NodeStyles = {
    angleType: "corner",
    backgroundColor: "yellow",
    borderColor: "black",
    borderRadius: 8,
    borderStyle: "solid",
    fontFamily: "Sans Serif",
    fontSize: 14,
    lineColor: "black",
    lineType: "solid",
    lineWidth: 4,
    textAlign: "center",
    textColor: "black"
};

export const MockStickersMap = {
    sticker: {
        id: "mock-sticker-node",
        type: "sticker",
        locked: false,
        rect: MockRect,
        styles: {
            backgroundColor: MockNodeStyles.backgroundColor,
            borderColor: MockNodeStyles.borderColor,
            borderRadius: MockNodeStyles.borderRadius,
            borderStyle: MockNodeStyles.borderStyle,
            fontFamily: MockNodeStyles.fontFamily,
            textAlign: MockNodeStyles.textAlign,
            textColor: MockNodeStyles.textColor
        },
        text: "Sticker Text"
    } satisfies StickerNode,
    arrow: {
        id: "mock-arrow-node",
        type: "arrow",
        locked: false,
        styles: {
            angleType: MockNodeStyles.angleType,
            lineColor: MockNodeStyles.lineColor,
            lineType: MockNodeStyles.lineType,
            lineWidth: MockNodeStyles.lineWidth
        },
        start: {
            x: 100,
            y: 100
        },
        end: {
            x: 200,
            y: 200
        }
    } satisfies ArrowNode,
    text: {},
    shape: {},
    media: {},
    note: {}
} satisfies Record<NodeTypes, unknown>;
