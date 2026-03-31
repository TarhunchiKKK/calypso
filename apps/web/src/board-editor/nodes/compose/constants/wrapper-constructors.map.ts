import type { Boards } from "@repo/common";
import type { NodeWrapper } from "@/board-editor/core";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { ArrowNodeWrapper } from "../../variants/arrow/arrow-node.wrapper";
import { ShapeNodeNodeWrapper } from "../../variants/shape/shape-node.wrapper";
import { StickerNodeWrapper } from "../../variants/sticker/sticker.wrapper";
import { TextNodeWrapper } from "../../variants/text/text-node.wrapper";

export const WrapperConstructorsMap: Record<Boards.NodeTypes, ConstructorFunction<typeof NodeWrapper>> = {
    sticker: node => new StickerNodeWrapper(node as Boards.StickerNode),
    arrow: node => new ArrowNodeWrapper(node as Boards.ArrowNode),
    text: node => new TextNodeWrapper(node as Boards.TextNode),
    shape: node => new ShapeNodeNodeWrapper(node as Boards.ShapeNode)
};
