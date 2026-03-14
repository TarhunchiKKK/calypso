import type { CreateRectNodeDto, RectNode, UpdateRectNodeDto } from "../core/rect-node.types";

export type StickerNode = RectNode & {
    type: "sticker";

    text: string;
};

export type CreateStickerNodeDto = CreateRectNodeDto & Pick<StickerNode, "type" | "text">;

export type UpdateStickerNodeDto = UpdateRectNodeDto & Pick<StickerNode, "type" | "text">;
