import type { NodeTypes } from "@repo/boards-common";
import { Separator } from "@/shared/ui/kit";
import { AngleType } from "./elements/angle/components";
import { BorderColor, BorderRadius, BorderStyle } from "./elements/border/components";
import { BackgroundColor, TextColor } from "./elements/color/components";
import { FontFamily, FontSize } from "./elements/font/components";
import { LineColor, LineType, LineWidth } from "./elements/line/components";
import { TextAlign } from "./elements/text/components";
import { StylesGroupWrapper } from "./lib/styles-group-wrapper.component";
import type { ElementProps } from "./lib/types";

export function getNodeSpecificStyles(type: NodeTypes | null): (fn: ElementProps["update"]) => React.ReactNode {
    switch (type) {
        case null:
            return () => null;
        case "sticker": {
            return update => (
                <>
                    <StylesGroupWrapper>
                        <FontFamily update={update} />

                        <FontSize update={update} />
                    </StylesGroupWrapper>

                    <Separator orientation="vertical" className="h-5!" />

                    <StylesGroupWrapper>
                        <BackgroundColor update={update} />

                        <TextColor update={update} />
                    </StylesGroupWrapper>

                    <Separator orientation="vertical" className="h-5!" />

                    <StylesGroupWrapper>
                        <BorderStyle update={update} />

                        <BorderColor update={update} />

                        <BorderRadius update={update} />
                    </StylesGroupWrapper>

                    <Separator orientation="vertical" className="h-5!" />

                    <StylesGroupWrapper>
                        <TextAlign update={update} />
                    </StylesGroupWrapper>

                    <Separator orientation="vertical" className="h-5!" />
                </>
            );
        }
        case "arrow": {
            return update => (
                <>
                    <StylesGroupWrapper>
                        <LineWidth update={update} />

                        <LineColor update={update} />

                        <LineType update={update} />
                    </StylesGroupWrapper>

                    <Separator orientation="vertical" className="h-5!" />

                    <StylesGroupWrapper>
                        <AngleType update={update} />
                    </StylesGroupWrapper>

                    <Separator orientation="vertical" className="h-5!" />
                </>
            );
        }
        case "text": {
            return update => (
                <>
                    <StylesGroupWrapper>
                        <FontFamily update={update} />

                        <FontSize update={update} />
                    </StylesGroupWrapper>

                    <Separator orientation="vertical" className="h-5!" />

                    <StylesGroupWrapper>
                        <TextColor update={update} />
                    </StylesGroupWrapper>

                    <Separator orientation="vertical" className="h-5!" />

                    <StylesGroupWrapper>
                        <TextAlign update={update} />
                    </StylesGroupWrapper>

                    <Separator orientation="vertical" className="h-5!" />
                </>
            );
        }
        case "shape": {
            return update => (
                <>
                    <StylesGroupWrapper>
                        <BackgroundColor update={update} />

                        <BorderColor update={update} />
                    </StylesGroupWrapper>

                    <Separator orientation="vertical" className="h-5!" />
                </>
            );
        }
        case "media": {
            return () => <></>;
        }
        default: {
            throw new Error(`Unknown node type: ${type}`);
        }
    }
}
