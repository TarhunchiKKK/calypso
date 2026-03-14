import type { CreateRectNodeDto, RectNode, UpdateRectNodeDto } from "../core/rect-node.types";

export type ShapeVariants = "rectangle" | "circle" | "triangle" | "diamond" | "star" | "hexagon";

export type ShapeNode = RectNode & {
    type: "shape";

    variant: ShapeVariants;
};

export type CreateShapeNodeDto = CreateRectNodeDto & Pick<ShapeNode, "type" | "variant">;

export type UpdateShapeNodeDto = UpdateRectNodeDto & Pick<ShapeNode, "type" | "variant">;
