import { Prop } from "@nestjs/mongoose";

export class NodeBase {
    @Prop({ type: String, required: true })
    public id: string;

    @Prop({ type: String, required: true })
    public type: string;

    @Prop({ type: Boolean, default: false })
    public blocked: boolean;
}
