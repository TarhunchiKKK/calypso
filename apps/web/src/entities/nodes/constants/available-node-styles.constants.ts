import type { NodeStyles, NodeTypes } from "@lib/boards";
import { CommonNodeStyles } from "./common-node-styles.constants";

type ArrayFields<T extends Record<string, unknown>> = {
    [Key in keyof T]: T[Key][];
};

export const AvailableNodeStyles: Record<NodeTypes, Partial<ArrayFields<NodeStyles>>> = {
    sticker: {
        backgroundColor: CommonNodeStyles.backgroundColor,
        borderColor: CommonNodeStyles.textColor,
        borderRadius: [0, 4, 8, 16, 24],
        borderStyle: CommonNodeStyles.borderStyle,
        fontFamily: CommonNodeStyles.fontFamily,
        textAlign: CommonNodeStyles.textAlign,
        textColor: CommonNodeStyles.textColor
    },
    arrow: {
        angleType: CommonNodeStyles.angleType,
        lineColor: CommonNodeStyles.lineColor,
        lineWidth: [1, 2, 3, 4, 5],
        lineType: CommonNodeStyles.lineType
    },
    text: {
        fontFamily: CommonNodeStyles.fontFamily,
        fontSize: [4, 8, 12, 18, 24, 32, 48],
        textAlign: CommonNodeStyles.textAlign,
        textColor: CommonNodeStyles.textColor
    },
    shape: {
        backgroundColor: CommonNodeStyles.backgroundColor,
        borderColor: CommonNodeStyles.borderColor
    },
    media: {
        borderColor: CommonNodeStyles.borderColor,
        borderRadius: [0, 4, 8, 16, 24, 9999]
    },
    note: {
        backgroundColor: CommonNodeStyles.backgroundColor,
        borderColor: CommonNodeStyles.borderColor
    },
    drawing: {
        lineColor: CommonNodeStyles.lineColor,
        lineWidth: [2, 4, 8, 12, 16, 20]
    }
};
