import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { Boards, Rect } from "@repo/common";
import { NodeBase } from "./node-base.schema";

@Schema()
export class TextNode extends NodeBase implements Boards.TextNode {
    @Prop({ type: String, required: true })
    public declare type: "text";

    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public text: string;
}

export const TextNodeSchema = SchemaFactory.createForClass(TextNode);
