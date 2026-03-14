import type { Boards } from "@repo/common";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateBoardDto implements Boards.CreateBoardDto {
    @IsString({ message: "Board title should be string" })
    @IsNotEmpty({ message: "Board title should be provided" })
    public title: string;

    @IsUUID("4", { message: "Board creator id should be valid 'uuid'" })
    public creatorId: string;
}
