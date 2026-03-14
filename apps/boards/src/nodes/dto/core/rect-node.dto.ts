import type { Boards, Rect } from "@repo/common";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsPositive, ValidateNested } from "class-validator";
import { NodeBaseDto } from "./node-base.dto";

export class RectNodeDto extends NodeBaseDto implements Boards.RectNode {
    @IsObject({ message: "Incorrect sizes format" })
    @ValidateNested()
    @Type(() => RectDto)
    public rect: RectDto;
}

class RectDto implements Rect {
    @IsNotEmpty({ message: "X coordinate hould be provided" })
    @IsNumber(undefined, { message: "X coordinate should be number" })
    public x: number;

    @IsNotEmpty({ message: "Y coordinate hould be provided" })
    @IsNumber(undefined, { message: "Y coordinate should be number" })
    public y: number;

    @IsNotEmpty({ message: "Width hould be provided" })
    @IsNumber(undefined, { message: "Width should be number" })
    @IsPositive({ message: "Width should be grater than 0" })
    public width: number;

    @IsNotEmpty({ message: "Height hould be provided" })
    @IsNumber(undefined, { message: "Height should be number" })
    @IsPositive({ message: "Height should be grater than 0" })
    public height: number;
}
