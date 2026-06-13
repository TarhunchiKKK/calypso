import type { Id } from "@lib/common";
import { NotFoundException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import type { Model } from "mongoose";
import { NodeBase } from "src/nodes/schemas/node-base.schema";
import type { Repository } from "typeorm";
import type { DuplicateBoardDto } from "../dto/duplicate-board.dto";
import { Board } from "../entities/board.entity";

export class DuplicateBoardCommand extends Command<Board> {
    public constructor(public dto: DuplicateBoardDto) {
        super();
    }
}

@CommandHandler(DuplicateBoardCommand)
export class DuplicateBoardCommandHandler implements ICommandHandler<DuplicateBoardCommand> {
    public constructor(
        @InjectRepository(Board) private readonly boardRepository: Repository<Board>,
        @InjectModel(NodeBase.name) private readonly nodesModel: Model<NodeBase>
    ) {}

    public async execute({ dto }: DuplicateBoardCommand) {
        const board = await this.createBoard(dto);

        await this.createNodes(dto.id, board.id);

        return board;
    }

    private async createBoard(dto: DuplicateBoardDto) {
        const board = await this.boardRepository.findOne({
            where: {
                id: dto.id
            }
        });

        if (!board) {
            throw new NotFoundException("Board not found");
        }

        return await this.boardRepository.save({
            ...board,
            title: dto.title,
            creatorId: dto.creatorId
        });
    }

    private async createNodes(oldBoardId: Id, newBoardId: Id) {
        const nodes = await this.nodesModel.find({
            boardId: {
                $eq: oldBoardId
            }
        });

        const newNodes = nodes.map((node) => ({
            ...node,
            boardId: newBoardId
        }));

        await this.nodesModel.insertMany(newNodes);
    }
}
