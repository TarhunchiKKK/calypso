import type { Boards } from "@repo/common";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class NodeStylesDto implements Boards.NodeStyles {
    @IsNotEmpty({ message: "Font family should be provided" })
    @IsString({ message: "Font family should be string" })
    public fontFamily: string;

    @IsNotEmpty({ message: "Font size should be provided" })
    @IsNumber(undefined, { message: "Font size should be string" })
    @IsPositive({ message: "Font size should be grater than zero" })
    public fontSize: number;

    @IsNotEmpty({ message: "Background color should be provided" })
    @IsString({ message: "Background color should be string" })
    public backgroundColor: string;

    @IsNotEmpty({ message: "Text color should be provided" })
    @IsString({ message: "Text color should be string" })
    public color: string;

    @IsNotEmpty({ message: "Border style should be provided" })
    @IsString({ message: "Border style should be string" })
    public borderStyle: "none" | "solid" | "dotted" | "dashed";

    @IsNotEmpty({ message: "Border color should be provided" })
    @IsString({ message: "Border color should be string" })
    public borderColor: string;

    @IsNotEmpty({ message: "Border radius  should be provided" })
    @IsNumber(undefined, { message: "Border radius should be number" })
    public borderRadius: number;

    @IsNotEmpty({ message: "Text align should be provided" })
    @IsString({ message: "Text align should be string" })
    public textAlign: "left" | "center" | "right" | "justify";
}
