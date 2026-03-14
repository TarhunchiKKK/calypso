import type { Boards } from "@repo/common";
import { Equals, IsEnum, IsNotEmpty } from "class-validator";
import { RectNodeDto } from "../core/rect-node.dto";

export class ShapeNodeDto extends RectNodeDto implements Boards.ShapeNode {
    @Equals("shape")
    public declare type: "shape";

    @IsNotEmpty({ message: "Shape variant should be provided" })
    @IsEnum(["rectangle", "circle", "triangle", "diamond", "star", "hexagon"])
    public variant: Boards.ShapeVariants;
}
