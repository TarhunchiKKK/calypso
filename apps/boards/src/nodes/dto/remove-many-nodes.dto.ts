import type { Id } from "@repo/common";
import { IsArray, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RemoveManyNodesDto {
    @IsNotEmpty({ message: "Ids should be provided" })
    @IsArray({ message: "Ids should be listed in array" })
    @MinLength(1, { each: true, message: "Array should contain at least 1 item" })
    public ids: Id[];

    @IsNotEmpty({ message: "BoardId should be provided" })
    @IsString({ message: "Board id should be string" })
    public boardId: Id;
}
