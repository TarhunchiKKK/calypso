import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { NodeBase } from "./node-base.schema";
import { Boards, RelativePoint } from "@repo/common";

@Schema()
export class ArrowNode extends NodeBase implements Boards.ArrowNode {
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
