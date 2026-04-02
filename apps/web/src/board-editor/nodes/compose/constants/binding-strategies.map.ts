import type { Boards } from "@repo/common";
import type { NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";
import { ShapeBindingStrategy } from "../../variants/shape/strategies/binding.strategy";
import { StickerBindingStrategy } from "../../variants/sticker/strategies/binding.strategy";
import { TextNodeBindingStrategy } from "../../variants/text/strategies/binding.strategy";
import type { StrategiesMap } from "./types";

// FIX: simplify strategy params (remove node)
export const BindingStrategiesMap: StrategiesMap<typeof NodeBindingStrategy> = {
    sticker: (node, handlers) => new StickerBindingStrategy(node as Boards.StickerNode, handlers),
    arrow: null,
    text: (node, handlers) => new TextNodeBindingStrategy(node as Boards.TextNode, handlers),
    shape: (node, handlers) => new ShapeBindingStrategy(node as Boards.ShapeNode, handlers)
};
