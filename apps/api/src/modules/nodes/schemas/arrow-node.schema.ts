import type { ArrowNode as ArrowNodeType, NodeBase } from "@lib/boards";
import type { OmitFields, RelativePoint } from "@lib/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
