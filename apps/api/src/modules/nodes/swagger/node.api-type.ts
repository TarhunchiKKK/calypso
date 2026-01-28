import { ApiProperty } from "@nestjs/swagger";
import type { NodeTypes, NodeBase as TypeNodeBase } from "@repo/common";
import { NodeTypesEnum } from "../constants/node-types.constants";

export class NodeApiType implements TypeNodeBase {
    @ApiProperty({
        description: "Node id generated on the client",
        type: String,
        format: "uuid"
    })
    public id: string;

    @ApiProperty({
        description: "Board id that node belongs",
        type: String,
        format: "uuid"
    })
    public boardId: string;

    @ApiProperty({
        description: "Node blocking status",
        type: Boolean
    })
    public blocked: boolean;

    @ApiProperty({
        description: "Type of node",
        type: String,
        enum: NodeTypesEnum
    })
    public type: NodeTypes;
}
