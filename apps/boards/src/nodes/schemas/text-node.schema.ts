import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { TextNode as TextNodeType } from "@repo/boards-common";
import type { Rect } from "@repo/common";
import { NodeBase } from "./node-base.schema";

@Schema()
export class TextNode extends NodeBase implements TextNodeType {
    @Prop({ type: String, required: true })
    public declare type: "text";

    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public text: string;
}

export const TextNodeSchema = SchemaFactory.createForClass(TextNode);
