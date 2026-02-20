import { ApiProperty } from "@nestjs/swagger";
import type { NodeStyles } from "@repo/common";

export class NodeStylesApiType implements NodeStyles {
    @ApiProperty({
        description: "Font family",
        type: String
    })
    public fontFamily: string;

    @ApiProperty({
        description: "Font size",
        type: Number
    })
    public fontSize: number;

    @ApiProperty({
        description: "Background color",
        type: String,
        format: "color"
    })
    public backgroundColor: string;

    @ApiProperty({
        description: "Text color",
        type: String,
        format: "color"
    })
    public color: string;

    @ApiProperty({
        description: "Border style",
        type: String
    })
    public borderStyle: "none" | "solid" | "dotted" | "dashed";

    @ApiProperty({
        description: "Border color",
        type: String,
        format: "color"
    })
    public borderColor: string;

    @ApiProperty({
        description: "Border radius",
        type: Number
    })
    public borderRadius: number;

    @ApiProperty({
        description: "Text align",
        type: String
    })
    public textAlign: "left" | "center" | "right" | "justify";
}
