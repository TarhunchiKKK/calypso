import type { DrawingNode as DrawingNodeType, NodeBase } from "@lib/boards";
import type { OmitFields, Rect } from "@lib/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
class DrawingNode implements OmitFields<DrawingNodeType, keyof NodeBase> {
    @Prop({ type: Object, required: false })
    public rect: Rect;

    @Prop({ type: [Object], required: true })
    public points: { x: number; y: number }[];
}

export const DrawingNodeSchema = SchemaFactory.createForClass(DrawingNode);
