import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { NodeTypes, NodeBase as TypeNodeBase } from "@repo/common";

const nodeTypes: NodeTypes[] = ["sticker", "text"];

@Schema({ discriminatorKey: "type" })
export class NodeBase implements TypeNodeBase {
    @Prop({ type: String, required: true })
    public id: string;

    @Prop({ type: String, required: true, enum: nodeTypes })
    public type: NodeTypes;

    @Prop({ type: Boolean, default: false })
    public blocked: boolean;
}

export const NodeBaseSchema = SchemaFactory.createForClass(NodeBase);
