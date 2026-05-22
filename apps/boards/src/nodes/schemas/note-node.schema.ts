import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { NodeBase, NoteNode as NoteNodeType } from "@repo/boards";
import type { FormattableElement, OmitFields, Rect } from "@repo/common";

@Schema()
class NoteNode implements OmitFields<NoteNodeType, keyof NodeBase> {
    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: [Object], required: true })
    public content: FormattableElement[];
}

export const NoteNodeSchema = SchemaFactory.createForClass(NoteNode);
