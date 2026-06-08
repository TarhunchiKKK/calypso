import type { ArrowNode as ArrowNodeType, NodeBase } from "@lib/boards";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { OmitFields, RelativePoint } from "@repo/common";

@Schema()
class ArrowNode implements OmitFields<ArrowNodeType, keyof NodeBase> {
    @Prop({ type: Object, required: false })
    public start: RelativePoint;

    @Prop({ type: Object, required: false })
    public end: RelativePoint;

    @Prop({ type: String, required: false })
    public text?: string;
}

export const ArrowNodeSchema = SchemaFactory.createForClass(ArrowNode);
