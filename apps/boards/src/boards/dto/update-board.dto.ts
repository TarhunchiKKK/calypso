import type { Boards } from "@repo/common";
import { IsOptional, IsString } from "class-validator";

export class UpdateBoardDto implements Boards.UpdateBoardDto {
    @IsOptional()
    @IsString({ message: "Board title should be string" })
    public title?: string;
}
