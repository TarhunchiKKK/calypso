import type { Boards } from "@repo/common";
import { Equals, IsNotEmpty, IsString } from "class-validator";
import { RectNodeDto } from "../core/rect-node.dto";

export class StickerNodeDto extends RectNodeDto implements Boards.StickerNode {
    @Equals("sticker")
    public declare type: "sticker";

    @IsNotEmpty({ message: "Text should be provided" })
    @IsString({ message: "Text should be string" })
    public text: string;
}
