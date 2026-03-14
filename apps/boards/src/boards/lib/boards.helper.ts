import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { Board } from "../schemas/board.schema";

@Injectable()
export class BoardsHelper {
    public constructor(@InjectModel(Board.name) private readonly boardModel: Model<Board>) {}

    public async findOneById(id: string) {
        const board = await this.boardModel.findById(id);

        if (!board) {
            throw new NotFoundException("Board not found");
        }

        return board;
    }
}
