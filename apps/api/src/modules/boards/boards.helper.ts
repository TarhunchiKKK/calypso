import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { BoardEntity } from "./entities/board.entity";

@Injectable()
export class BoardsHelper {
    public constructor(@InjectRepository(BoardEntity) private readonly boardsRepository: Repository<BoardEntity>) {}

    public async checkExisting(username: string, title: string) {
        const exists = await this.boardsRepository.exists({
            where: {
                title: title,
                creator: {
                    username: username
                }
            },
            relations: ["creator"]
        });

        if (exists) {
            throw new ConflictException(`You already have board with title ${title}`);
        }
    }
}
