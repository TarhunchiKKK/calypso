import { ApiProperty } from "@nestjs/swagger";
import type { NodeBase, NodeTypes } from "@repo/common";
import { NodeTypesEnum } from "../constants/node-types.constants";
import { NodeStylesApiType } from "./node-styles.api-type";

export class NodeApiType implements NodeBase {
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

    @ApiProperty({
        description: "Node styles",
        type: NodeStylesApiType
    })
    public styles: NodeStylesApiType;
}
