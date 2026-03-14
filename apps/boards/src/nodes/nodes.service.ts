import { Injectable } from "@nestjs/common";
import type { CreateNodeDto } from "./dto/create-node.dto";
import type { UpdateNodeDto } from "./dto/update-node.dto";

@Injectable()
export class NodesService {
    public async createMany(createNodeDto: CreateNodeDto) {
        return null;
    }

    public async findAll(boardId: string) {
        return null;
    }

    public async updateMany(updateNodeDto: UpdateNodeDto) {
        return null;
    }

    public async removeMany(id: string) {
        return null;
    }
}
