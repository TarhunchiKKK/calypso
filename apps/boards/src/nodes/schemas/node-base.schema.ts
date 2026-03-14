import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { Boards } from "@repo/common";
import { Types } from "mongoose";

@Schema({ discriminatorKey: "type" })
export class NodeBase implements Boards.NodeBase {
    @Prop({ type: String, required: true })
    public id: string;

    @Prop({ type: String, required: true })
    public type: Boards.NodeTypes;

    @Prop({ type: Types.ObjectId, required: true })
    public boardId: string;

    @Prop({ type: Boolean, required: true })
    public locked: boolean;

    @Prop({ type: Object, required: true })
    public styles: Boards.NodeStyles;
}

export const NodeBaseSchema = SchemaFactory.createForClass(NodeBase);
