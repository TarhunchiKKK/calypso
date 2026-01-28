import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { Rect as TypeRect } from "@repo/common";

@Schema()
export class Rect implements TypeRect {
    @Prop({ type: Number, required: true })
    public x: number;

    @Prop({ type: Number, required: true })
    public y: number;

    @Prop({ type: Number, required: true })
    public width: number;

    @Prop({ type: Number, required: true })
    public height: number;
}

export const RectSchema = SchemaFactory.createForClass(Rect);
