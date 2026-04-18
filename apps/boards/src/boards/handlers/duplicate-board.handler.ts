import { NotFoundException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import type { Id } from "@repo/common";
import type { Model } from "mongoose";
import { NodeBase } from "src/nodes/schemas/node-base.schema";
import type { Repository } from "typeorm";
import type { DuplicateBoardDto } from "../dto/duplicate-board.dto";
import { Board } from "../entities/board.entity";
import { BoardCreator } from "../entities/board-creator.entity";

export class DuplicateBoardCommand extends Command<Board> {
    public constructor(public dto: DuplicateBoardDto) {
        super();
    }
}

@CommandHandler(DuplicateBoardCommand)
export class DuplicateBoardCommandHandler implements ICommandHandler<DuplicateBoardCommand> {
    public constructor(
        @InjectRepository(Board) private readonly boardRepository: Repository<Board>,
        @InjectRepository(BoardCreator) private readonly creatorsRepository: Repository<BoardCreator>,
        @InjectModel(NodeBase.name) private readonly nodesModel: Model<NodeBase>
    ) {}

    public async execute({ dto }: DuplicateBoardCommand) {
        await this.createCreator(dto.creator);

        const board = await this.createBoard({
            ...dto,
            creator: {
                id: dto.creator.id
            }
        });

        await this.createNodes(dto.id, board.id);

        return board;
    }

    private async createCreator(creator: DuplicateBoardDto["creator"]) {
        const creatorExists = await this.creatorsRepository.exists({
            where: {
                id: creator.id
            }
        });

        if (!creatorExists) {
            await this.creatorsRepository.save(creator);
        }
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
            title: board.title,
            creator: dto.creator
        });
    }

    private async createNodes(oldBoardId: Id, newBoardId: Id) {
        const nodes = await this.nodesModel.find({
            boardId: {
                $eq: oldBoardId
            }
        });

        const newNodes = nodes.map(node => ({
            ...node,
            boardId: newBoardId
        }));

        await this.nodesModel.insertMany(newNodes);
    }
}
