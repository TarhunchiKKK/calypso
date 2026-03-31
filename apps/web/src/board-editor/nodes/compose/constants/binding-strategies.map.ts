import type { Boards } from "@repo/common";
import type { NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { ShapeBindingStrategy } from "../../variants/shape/lib/binding.strategy";
import { StickerBindingStrategy } from "../../variants/sticker/lib/binding.strategy";
import { TextNodeBindingStrategy } from "../../variants/text/lib/binding.strategy";

export const BindingStrategiesMap: Record<Boards.NodeTypes, ConstructorFunction<typeof NodeBindingStrategy> | null> = {
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
