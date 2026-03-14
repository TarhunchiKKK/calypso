import type { CreateRectNodeDto, RectNode, UpdateRectNodeDto } from "../core/rect-node.types";

export type TextNode = RectNode & {
    type: "text";

    text: string;
};

export type CreateTextNodeDto = CreateRectNodeDto & Pick<TextNode, "type" | "text">;

export type UpdateTextNodeDto = UpdateRectNodeDto & Pick<TextNode, "type" | "text">;
