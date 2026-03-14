import type { Boards } from "@repo/common";
import { Equals, IsNotEmpty, IsString } from "class-validator";
import { RectNodeDto } from "../core/rect-node.dto";

export class TextNodeDto extends RectNodeDto implements Boards.TextNode {
    @Equals("text")
    public declare type: "text";

    @IsNotEmpty({ message: "Text should be provided" })
    @IsString({ message: "Text should be string" })
    public text: string;
}
