import type { AnyNode, CreateManyNodesDto, RemoveManyNodesDto, UpdateManyNodesDto } from "@lib/boards";
import { ApiProperty } from "@nestjs/swagger";
import { NodeApiType } from "./entities.swagger";

export class CreateManyNodesDtoApiType implements CreateManyNodesDto {
    @ApiProperty({ type: String, format: "uuid", description: "Board id where nodes should be added" })
    public boardId: string;

    @ApiProperty({ type: [NodeApiType], isArray: true, description: "List of nodes to create" })
    public nodes: AnyNode[];
}

export class UpdateManyNodesDtoApiType implements UpdateManyNodesDto {
    @ApiProperty({ type: String, format: "uuid", description: "Board id where nodes should be updated" })
    public boardId: string;

    @ApiProperty({ type: [NodeApiType], isArray: true, description: "List of nodes to updated" })
    public nodes: AnyNode[];
}

export class RemoveManyNodesDtoApiType implements RemoveManyNodesDto {
    @ApiProperty({ type: String, description: "Board id where nodes should be updated" })
    public boardId: string;

    @ApiProperty({ type: [String], isArray: true, description: "List of node ids to remove" })
    public ids: string[];
}
