import type { NodeBase, TextNode as TextNodeType } from "@lib/boards";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { FormattableElement, OmitFields, Rect } from "@repo/common";

@Schema()
class TextNode implements OmitFields<TextNodeType, keyof NodeBase> {
    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: [Object], required: true })
    public content: FormattableElement[];
}

export const TextNodeSchema = SchemaFactory.createForClass(TextNode);
