import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { Boards } from "@repo/common";
import type { HydratedDocument } from "mongoose";

@Schema()
export class Board implements Boards.Board {
    @Prop({ type: String, required: true })
    public title: string;

    @Prop({ type: String, required: true })
    public creatorId: string;

    @Prop({ type: Date, default: () => new Date() })
    public createdAt: Date;

    @Prop({ type: Date, required: false })
    public updatedAt?: Date;
}

export type BoardDocument = HydratedDocument<Board>;

export const BoardSchema = SchemaFactory.createForClass(Board);
