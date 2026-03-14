import type { Boards } from "@repo/common";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
import { NodeStylesDto } from "./node-styles.dto";

export class NodeBaseDto implements Boards.NodeBase {
    @IsNotEmpty({ message: "Node id should be provided" })
    @IsString({ message: "Node id should be string" })
    public id: string;

    @IsNotEmpty({ message: "Node type should be provided" })
    @IsEnum(["sticker", "text", "shape"], { message: "Unknown node type" })
    public type: Boards.NodeTypes;

    @IsNotEmpty({ message: "Board id should be provided" })
    @IsString({ message: "Board id should be string" })
    public boardId: string;

    @IsNotEmpty({ message: "Node locking status shpuld be provided" })
    @IsBoolean({ message: "Incorrect locking status format" })
    public locked: boolean;

    @IsObject({ message: "Incorrect styles format" })
    @ValidateNested()
    @Type(() => NodeStylesDto)
    public styles: NodeStylesDto;
}
