import { Injectable } from "@nestjs/common";
import type { CreateBoardDto } from "./dto/create-board.dto";
import type { UpdateBoardDto } from "./dto/update-board.dto";

@Injectable()
export class BoardsService {
    public constructor(public value: string) {}

    public async create(dto: CreateBoardDto) {}

    public async findAll() {}

    public async findOne(id: string) {}

    public async update(id: string, dto: UpdateBoardDto) {}

    public async remove(id: string) {}
}
