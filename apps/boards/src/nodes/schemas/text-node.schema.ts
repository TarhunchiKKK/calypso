import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { NodeBase, TextNode as TextNodeType } from "@repo/boards-common";
import type { OmitFields, Rect } from "@repo/common";

@Schema()
export class TextNode implements OmitFields<TextNodeType, keyof NodeBase> {
    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public text: string;
}

export const TextNodeSchema = SchemaFactory.createForClass(TextNode);
