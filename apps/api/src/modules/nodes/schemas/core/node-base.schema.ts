import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { NodeTypes, NodeBase as TypeNodeBase } from "@repo/common";
import { NodeTypesEnum } from "../../constants/node-types.constants";
import { NodeStyles } from "./node-styles.schema";

@Schema({ discriminatorKey: "type" })
export class NodeBase implements TypeNodeBase {
    @Prop({ type: String, required: true })
    public id: string;

    @Prop({ type: String, required: true })
    public boardId: string;

    @Prop({ type: String, required: true, enum: NodeTypesEnum })
    public type: NodeTypes;

    @Prop({ type: Boolean, default: false })
    public blocked: boolean;

    @Prop({ type: NodeStyles, required: true })
    public styles: NodeStyles;
}

export const NodeBaseSchema = SchemaFactory.createForClass(NodeBase);
