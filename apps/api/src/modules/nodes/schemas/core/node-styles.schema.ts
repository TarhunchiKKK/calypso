import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { NodeStyles as TypeNodeStyles, UnknownFields } from "@repo/common";

@Schema()
export class NodeStyles implements Partial<UnknownFields<TypeNodeStyles>> {
    @Prop({ type: String, required: false })
    public fontFamily: string;

    @Prop({ type: Number, required: false })
    public fontSize: number;

    @Prop({ type: String, required: false })
    public backgroundColor: string;

    @Prop({ type: String, required: false })
    public color: string;

    @Prop({ type: String, required: false })
    public borderStyle: "none" | "solid" | "dotted" | "dashed";

    @Prop({ type: String, required: false })
    public borderColor: string;

    @Prop({ type: Number, required: false })
    public borderRadius: number;

    @Prop({ type: String, required: false })
    public textAlign: "left" | "center" | "right" | "justify";
}

export const NodeStylesSchema = SchemaFactory.createForClass(NodeStyles);
