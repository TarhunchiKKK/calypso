import type { NodeStyles, NodeTypes } from "@repo/boards";
import { AvailableNodeStyles, CommonNodeStyles } from "@/entities/nodes";
import { AngleType } from "../elements/angle/components";
import { BorderColor, BorderRadius, BorderStyle } from "../elements/border/components";
import { BackgroundColor, TextColor } from "../elements/color/components";
import { FontFamily, FontSize } from "../elements/font/components";
import { LineColor, LineType, LineWidth } from "../elements/line/components";
import { TextAlign } from "../elements/text/components";
import type { ElementProps } from "../lib/types";

type Renderer = (type: NodeTypes, update: ElementProps<keyof NodeStyles>["update"], key?: string | number) => React.ReactNode;

export const NodeStyleRenderersMap: Record<keyof NodeStyles, Renderer> = {
    fontFamily: (type, update, key) => {
        if (!AvailableNodeStyles[type].fontFamily) {
            throw new Error(`Font family is not available for "${type}"" node`);
        }
        return <FontFamily key={key} values={CommonNodeStyles.fontFamily} update={update} />;
    },
    fontSize: (type, update, key) => {
        if (!AvailableNodeStyles[type].fontSize) {
            throw new Error(`Font size is not available for "${type}"" node`);
        }

        return <FontSize key={key} values={AvailableNodeStyles[type].fontSize} update={update} />;
    },
    backgroundColor: (type, update, key) => {
        if (!AvailableNodeStyles[type].backgroundColor) {
            throw new Error(`Background color is not available for "${type}"" node`);
        }

        return <BackgroundColor key={key} values={AvailableNodeStyles[type].backgroundColor} update={update} />;
    },
    textColor: (type, update, key) => {
        if (!AvailableNodeStyles[type].textColor) {
            throw new Error(`Text color is not available for "${type}"" node`);
        }

        return <TextColor key={key} values={AvailableNodeStyles[type].textColor} update={update} />;
    },
    borderStyle: (type, update, key) => {
        if (!AvailableNodeStyles[type].borderStyle) {
            throw new Error(`Border style is not available for "${type}"" node`);
        }

        return <BorderStyle key={key} values={AvailableNodeStyles[type].borderStyle} update={update} />;
    },
    borderColor: (type, update, key) => {
        if (!AvailableNodeStyles[type].borderColor) {
            throw new Error(`Border color is not available for "${type}"" node`);
        }

        return <BorderColor key={key} values={AvailableNodeStyles[type].borderColor} update={update} />;
    },
    borderRadius: (type, update, key) => {
        if (!AvailableNodeStyles[type].borderRadius) {
            throw new Error(`Border radius is not available for "${type}"" node`);
        }

        return <BorderRadius key={key} values={AvailableNodeStyles[type].borderRadius} update={update} />;
    },
    textAlign: (type, update, key) => {
        if (!AvailableNodeStyles[type].textAlign) {
            throw new Error(`Text align is not available for "${type}"" node`);
        }

        return <TextAlign key={key} values={AvailableNodeStyles[type].textAlign} update={update} />;
    },
    lineWidth: (type, update, key) => {
        if (!AvailableNodeStyles[type].lineWidth) {
            throw new Error(`Line width is not available for "${type}"" node`);
        }

        return <LineWidth key={key} values={AvailableNodeStyles[type].lineWidth} update={update} />;
    },
    lineColor: (type, update, key) => {
        if (!AvailableNodeStyles[type].lineColor) {
            throw new Error(`Line color is not available for "${type}"" node`);
        }

        return <LineColor key={key} values={AvailableNodeStyles[type].lineColor} update={update} />;
    },
    lineType: (type, update, key) => {
        if (!AvailableNodeStyles[type].lineType) {
            throw new Error(`Line type is not available for "${type}"" node`);
        }

        return <LineType key={key} values={AvailableNodeStyles[type].lineType} update={update} />;
    },
    angleType: (type, update, key) => {
        if (!AvailableNodeStyles[type].angleType) {
            throw new Error(`Angle type is not available for "${type}"" node`);
        }

        return <AngleType key={key} values={AvailableNodeStyles[type].angleType} update={update} />;
    }
};
