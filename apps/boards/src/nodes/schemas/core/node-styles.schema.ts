import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Boards } from "@repo/common";

@Schema()
export class NodeStyles implements Boards.NodeStyles {
    @Prop({ type: String, required: true })
    public fontFamily: string;

    @Prop({ type: Number, required: true })
    public fontSize: number;

    @Prop({ type: String, required: true })
    public backgroundColor: string;

    @Prop({ type: String, required: true })
    public color: string;

    @Prop({ type: String, required: true })
    public borderStyle: "none" | "solid" | "dotted" | "dashed";

    @Prop({ type: String, required: true })
    public borderColor: string;

    @Prop({ type: Number, required: true })
    public borderRadius: number;

    @Prop({ type: String, required: true })
    public textAlign: "left" | "center" | "right" | "justify";
}

export const NodeStylesSchema = SchemaFactory.createForClass(NodeStyles);
