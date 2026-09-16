import type { NodeBase, ShapeNode as ShapeNodeType, ShapeVariants } from "@lib/boards";
import type { OmitFields, Rect } from "@lib/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
class ShapeNode implements OmitFields<ShapeNodeType, keyof NodeBase> {
    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public variant: ShapeVariants;
}

export const ShapeNodeSchema = SchemaFactory.createForClass(ShapeNode);
