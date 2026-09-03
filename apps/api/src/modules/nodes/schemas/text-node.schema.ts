import type { NodeBase, TextNode as TextNodeType } from "@lib/boards";
import type { FormattableElement, OmitFields, Rect } from "@lib/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
class TextNode implements OmitFields<TextNodeType, keyof NodeBase> {
    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: [Object], required: true })
    public content: FormattableElement[];
}

export const TextNodeSchema = SchemaFactory.createForClass(TextNode);
