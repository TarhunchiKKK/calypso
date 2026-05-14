import type { ResizableNodeStrategy } from "@/board-editor/modules/resizing";
import { ResizableRectNodeStrategy } from "../../shared/strategies";
import { ResizableArrowStrategy } from "../../variants/arrow/strategies/resizable.strategy";
import type { StrategiesMap } from "./types";

export const ResizableStrategiesMap: StrategiesMap<ResizableNodeStrategy> = {
    sticker: new ResizableRectNodeStrategy({
        rect: true,
        diagonal: true
    }),
    arrow: new ResizableArrowStrategy(),
    text: new ResizableRectNodeStrategy({
        rect: true,
        diagonal: true
    }),
    shape: new ResizableRectNodeStrategy({
        rect: true
    }),
    media: new ResizableRectNodeStrategy({
        rect: true
    }),
    note: new ResizableRectNodeStrategy({
        rect: true,
        diagonal: true
    }),
    drawing: new ResizableRectNodeStrategy({
        diagonal: true
    })
};
