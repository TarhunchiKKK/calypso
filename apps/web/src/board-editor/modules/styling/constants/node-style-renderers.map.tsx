import type { NodeStyles } from "@repo/boards-common";
import { AngleType } from "../elements/angle/components";
import { BorderColor, BorderRadius, BorderStyle } from "../elements/border/components";
import { BackgroundColor, TextColor } from "../elements/color/components";
import { FontFamily, FontSize } from "../elements/font/components";
import { LineColor, LineType, LineWidth } from "../elements/line/components";
import { TextAlign } from "../elements/text/components";
import type { ElementProps } from "../lib/types";

export const NodeStyleRenderersMap: Record<keyof NodeStyles, (update: ElementProps["update"], key?: string | number) => React.ReactNode> = {
    fontFamily: (update, key) => <FontFamily key={key} update={update} />,
    fontSize: (update, key) => <FontSize key={key} update={update} />,
    backgroundColor: (update, key) => <BackgroundColor key={key} update={update} />,
    textColor: (update, key) => <TextColor key={key} update={update} />,
    borderStyle: (update, key) => <BorderStyle key={key} update={update} />,
    borderColor: (update, key) => <BorderColor key={key} update={update} />,
    borderRadius: (update, key) => <BorderRadius key={key} update={update} />,
    textAlign: (update, key) => <TextAlign key={key} update={update} />,
    lineWidth: (update, key) => <LineWidth key={key} update={update} />,
    lineColor: (update, key) => <LineColor key={key} update={update} />,
    lineType: (update, key) => <LineType key={key} update={update} />,
    angleType: (update, key) => <AngleType key={key} update={update} />
};
