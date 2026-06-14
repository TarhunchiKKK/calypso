import type { Id } from "@lib/common";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { Board } from "../entities/board.entity";

@Injectable()
export class BoardsHelper {
    public constructor(@InjectRepository(Board) private readonly boardsRepository: Repository<Board>) {}

    public async findOneById(id: Id) {
        const board = await this.boardsRepository.findOne({
            where: {
                id: id
            }
        });

        if (!board) {
            throw new NotFoundException("Board not found");
        }

        return board;
    }
}
