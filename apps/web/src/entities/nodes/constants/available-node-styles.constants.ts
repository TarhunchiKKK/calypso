import type { NodeStyles, NodeTypes, NodeTypesMap } from "@repo/boards";
import { CommonNodeStyles } from "./common-node-styles.constants";

export const AvailableNodeStyles = {
    sticker: {
        backgroundColor: CommonNodeStyles.backgroundColor,
        borderColor: CommonNodeStyles.textColor,
        borderRadius: [0, 4, 8, 16, 24],
        borderStyle: CommonNodeStyles.borderStyle,
        fontFamily: CommonNodeStyles.fontFamily,
        textAlign: CommonNodeStyles.textAlign,
        textColor: CommonNodeStyles.textColor
    } satisfies Record<keyof NodeTypesMap["sticker"]["styles"], unknown>,
    arrow: {
        angleType: CommonNodeStyles.angleType,
        lineColor: CommonNodeStyles.lineColor,
        lineWidth: [1, 2, 3, 4, 5] satisfies NodeStyles["lineWidth"][],
        lineType: CommonNodeStyles.lineType
    } satisfies Record<keyof NodeTypesMap["arrow"]["styles"], unknown>,
    text: {
        fontFamily: CommonNodeStyles.fontFamily,
        fontSize: [4, 8, 12, 18, 24, 32, 48] satisfies NodeStyles["fontSize"][],
        textAlign: CommonNodeStyles.textAlign,
        textColor: CommonNodeStyles.textColor
    } satisfies Record<keyof NodeTypesMap["text"]["styles"], unknown>,
    shape: {
        backgroundColor: CommonNodeStyles.backgroundColor,
        borderColor: CommonNodeStyles.borderColor
    } satisfies Record<keyof NodeTypesMap["shape"]["styles"], unknown>,
    media: {
        borderColor: CommonNodeStyles.borderColor,
        borderRadius: [0, 4, 8, 16, 24, 9999] satisfies NodeStyles["borderRadius"][]
    } satisfies Record<keyof NodeTypesMap["media"]["styles"], unknown>,
    note: {
        backgroundColor: CommonNodeStyles.backgroundColor,
        borderColor: CommonNodeStyles.borderColor
    } satisfies Record<keyof NodeTypesMap["note"]["styles"], unknown>,
    drawing: {
        lineColor: CommonNodeStyles.lineColor,
        lineWidth: [2, 4, 8, 12, 16, 20] satisfies NodeStyles["lineWidth"][]
    } satisfies Record<keyof NodeTypesMap["drawing"]["styles"], unknown>
} satisfies Record<NodeTypes, unknown>;
