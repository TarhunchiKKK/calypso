import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { NodeBase as NodeBaseType, NodeStyles, NodeTypes } from "@repo/boards";
import { Types } from "mongoose";

@Schema({ discriminatorKey: "type" })
export class NodeBase implements NodeBaseType {
    @Prop({ type: String, required: true })
    public id: string;

    @Prop({ type: String, required: true })
    public type: NodeTypes;

    @Prop({ type: Types.ObjectId, required: true })
    public boardId: string;

    @Prop({ type: Boolean, required: true })
    public locked: boolean;

    @Prop({ type: Object, required: true })
    public styles: NodeStyles;
}

export const NodeBaseSchema = SchemaFactory.createForClass(NodeBase);
