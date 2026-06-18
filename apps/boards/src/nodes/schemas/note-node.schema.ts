import type { NodeBase, NoteNode as NoteNodeType } from "@lib/boards";
import type { FormattableElement, OmitFields, Rect } from "@lib/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
class NoteNode implements OmitFields<NoteNodeType, keyof NodeBase> {
    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: [Object], required: true })
    public content: FormattableElement[];
}

export const NoteNodeSchema = SchemaFactory.createForClass(NoteNode);
