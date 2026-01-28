import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { NodeTypes, OmitFields, TextNode as TypeTextNode } from "@repo/common";
import { Rect } from "../core/geometry.schemas";
import { NodeBase } from "../core/node-base.schema";

type ImplementedType = OmitFields<TypeTextNode, "text"> & { text: string };

export const TEXT_NODE_DISCRIMINATOR_VALUE: NodeTypes = "text";

@Schema()
export class TextNode extends NodeBase implements ImplementedType {
    @Prop({ type: String, required: true, default: TEXT_NODE_DISCRIMINATOR_VALUE })
    public type: "text";

    @Prop({ type: Rect, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public text: string;
}

export const TextNodeSchema = SchemaFactory.createForClass(TextNode);
