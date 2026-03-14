import { Injectable } from "@nestjs/common";
import type { NodesArray } from "./dto/nodes-array.dto";

@Injectable()
export class NodesService {
    public async createMany(dtos: NodesArray["data"]) {
        return null;
    }

    public async findAll(boardId: string) {
        return null;
    }

    public async updateMany(dtos: NodesArray["data"]) {
        return null;
    }

    public async removeMany(id: string) {
        return null;
    }
}
