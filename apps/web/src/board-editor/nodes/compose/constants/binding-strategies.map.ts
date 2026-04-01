import type { Boards } from "@repo/common";
import type { NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";
import { ShapeBindingStrategy } from "../../variants/shape/strategies/binding.strategy";
import { StickerBindingStrategy } from "../../variants/sticker/strategies/binding.strategy";
import { TextNodeBindingStrategy } from "../../variants/text/strategies/binding.strategy";
import type { StrategiesMap } from "./types";

// FIX: simplify strategy params (remove node)
export const BindingStrategiesMap: StrategiesMap<typeof NodeBindingStrategy> = {
    sticker: node =>
        new StickerBindingStrategy(
            node as Boards.StickerNode,
            () => {},
            () => {}
        ),
    arrow: null,
    text: node =>
        new TextNodeBindingStrategy(
            node as Boards.TextNode,
            () => {},
            () => {}
        ),
    shape: node =>
        new ShapeBindingStrategy(
            node as Boards.ShapeNode,
            () => {},
            () => {}
        )
};
