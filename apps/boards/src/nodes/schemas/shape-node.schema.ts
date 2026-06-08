import type { NodeBase, ShapeNode as ShapeNodeType, ShapeVariants } from "@lib/boards";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { OmitFields, Rect } from "@repo/common";

@Schema()
class ShapeNode implements OmitFields<ShapeNodeType, keyof NodeBase> {
    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public variant: ShapeVariants;
}

export const ShapeNodeSchema = SchemaFactory.createForClass(ShapeNode);
