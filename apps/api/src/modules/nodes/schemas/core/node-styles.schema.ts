import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { NodeStyles as TypeNodeStyles, UnknownFields } from "@repo/common";

// HACK: Without this you will encounter TypeScript errors in nodes classes
type TextDecorationValues = "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";

@Schema()
export class NodeStyles implements Partial<UnknownFields<TypeNodeStyles>> {
    @Prop({ type: String, required: false })
    public fontFamily: string;

    @Prop({ type: Number, required: false })
    public fontSize: number;

    @Prop({ type: String, required: false })
    public fontStyle: string;

    @Prop({ type: Number, required: false })
    public fontWeight: number;

    @Prop({ type: String, required: false })
    public textDecoration: string;

    @Prop({ type: String, required: false })
    public backgroundColor: string;

    @Prop({ type: String, required: false })
    public textAlign: TextDecorationValues;

    @Prop({ type: String, required: false })
    public color: string;

    @Prop({ type: Number, required: false })
    public borderRadius: number;

    @Prop({ type: String, required: false })
    public borderColor: string;

    @Prop({ type: String, required: false })
    public borderStyle: string;
}

export const NodeStylesSchema = SchemaFactory.createForClass(NodeStyles);
