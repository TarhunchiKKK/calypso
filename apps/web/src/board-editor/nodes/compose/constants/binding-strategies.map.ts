import type { ShapeNode, StickerNode, TextNode } from "@repo/boards-common";
import type { NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";
import { ShapeBindingStrategy } from "../../variants/shape/strategies/binding.strategy";
import { StickerBindingStrategy } from "../../variants/sticker/strategies/binding.strategy";
import { TextNodeBindingStrategy } from "../../variants/text/strategies/binding.strategy";
import type { StrategiesMap } from "./types";

// FIX: simplify strategy params (remove node)
export const BindingStrategiesMap: StrategiesMap<typeof NodeBindingStrategy> = {
    sticker: (node, handlers) => new StickerBindingStrategy(node as StickerNode, handlers),
    arrow: null,
    text: (node, handlers) => new TextNodeBindingStrategy(node as TextNode, handlers),
    shape: (node, handlers) => new ShapeBindingStrategy(node as ShapeNode, handlers)
};
