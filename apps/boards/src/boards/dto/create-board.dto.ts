import type { Boards } from "@repo/common";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBoardDto implements Boards.CreateBoardDto {
    @IsString({ message: "Board title should be string" })
    @IsNotEmpty({ message: "Board title should be provided" })
    public title: string;
}
