import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Boards } from "@repo/common";
import { NodeStyles, NodeStylesSchema } from "./node-styles.schema";

@Schema()
export class NodeBase implements Boards.NodeBase {
    @Prop({ type: String, required: true })
    public id: string;

    @Prop({ type: String, required: true })
    public type: Boards.NodeTypes;

    @Prop({ type: String, required: true })
    public boardId: string;

    @Prop({ type: Boolean, required: true })
    public locked: boolean;

    @Prop({ schema: NodeStylesSchema, required: true })
    public styles: NodeStyles;
}

export const NodeBaseSchema = SchemaFactory.createForClass(NodeBase);
