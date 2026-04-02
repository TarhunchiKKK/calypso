import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { ShapeNode as ShapeNodeType, ShapeVariants } from "@repo/boards-common";
import type { Rect } from "@repo/common";
import { NodeBase } from "./node-base.schema";

@Schema()
export class ShapeNode extends NodeBase implements ShapeNodeType {
    @Prop({ type: String, required: true })
    public declare type: "shape";

    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public variant: ShapeVariants;
}

export const ShapeNodeSchema = SchemaFactory.createForClass(ShapeNode);
