import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { ArrowNode as ArrowNodeType } from "@repo/boards-common";
import type { RelativePoint } from "@repo/common";
import { NodeBase } from "./node-base.schema";

@Schema()
export class ArrowNode extends NodeBase implements ArrowNodeType {
    @Prop({ type: String, required: true })
    public declare type: "arrow";

    @Prop({ type: Object, required: false })
    public start: RelativePoint;

    @Prop({ type: Object, required: false })
    public end: RelativePoint;

    @Prop({ type: String, required: false })
    public text?: string;
}

export const ArrowNodeSchema = SchemaFactory.createForClass(ArrowNode);
