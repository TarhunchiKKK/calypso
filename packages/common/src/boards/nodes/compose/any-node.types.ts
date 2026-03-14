import type { CreateShapeNodeDto, ShapeNode, UpdateShapeNodeDto } from "../variants/shape-node.types";
import type { CreateStickerNodeDto, StickerNode, UpdateStickerNodeDto } from "../variants/sticker-node.types";
import type { CreateTextNodeDto, TextNode, UpdateTextNodeDto } from "../variants/text-node.types";

export type AnyNode = StickerNode | TextNode | ShapeNode;

export type CreateAnyNodeDto = CreateStickerNodeDto | CreateTextNodeDto | CreateShapeNodeDto;

export type UpdateAnyNodeDto = UpdateStickerNodeDto | UpdateTextNodeDto | UpdateShapeNodeDto;
