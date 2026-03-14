import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { Boards, Rect } from "@repo/common";
import { NodeBase } from "./node-base.schema";

@Schema()
export class ShapeNode extends NodeBase implements Boards.ShapeNode {
    @Prop({ type: String, required: true })
    public declare type: "shape";

    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public variant: Boards.ShapeVariants;
}

export const ShapeNodeSchema = SchemaFactory.createForClass(ShapeNode);
