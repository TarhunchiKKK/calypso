import type { NodeBase, NodeStyles, NodeTypes } from "@lib/boards";
import { ApiProperty } from "@nestjs/swagger";

export class NodeStylesApiType implements Partial<NodeStyles> {
    @ApiProperty({ type: String, nullable: true, description: "Font family for node text" })
    public fontFamily?: string;

    @ApiProperty({ type: Number, nullable: true, description: "Font size fo node text" })
    public fontSize?: number;

    @ApiProperty({ type: String, format: "hex", nullable: true, description: "Node background color" })
    public backgroundColor?: string;

    @ApiProperty({ type: String, format: "hex", nullable: true, description: "Node text color" })
    public textColor?: string;

    @ApiProperty({
        type: String,
        nullable: true,
        description: "Node border style",
        enum: ["none", "solid", "dotted", "dashed"] satisfies NodeStyles["borderStyle"][]
    })
    public borderStyle?: "none" | "solid" | "dotted" | "dashed";

    @ApiProperty({ type: String, format: "hex", nullable: true, description: "Node border color" })
    public borderColor?: string;

    @ApiProperty({ type: Number, nullable: true, description: "Node rectangle radius" })
    public borderRadius?: number;

    @ApiProperty({ type: String, nullable: true, description: "" })
    public textAlign?: "left" | "center" | "right" | "justify";

    @ApiProperty({ type: Number, nullable: true, description: "Arrow line width" })
    public lineWidth?: number;

    @ApiProperty({ type: String, format: "hex", nullable: true, description: "Arrow line color" })
    public lineColor?: string;

    @ApiProperty({ type: String, nullable: true, description: "Arrow line type", enum: ["solid", "dotted", "dashed"] satisfies NodeStyles["lineType"][] })
    public lineType?: "solid" | "dotted" | "dashed";

    @ApiProperty({
        type: String,
        nullable: true,
        description: "Arrow angle type",
        enum: ["corner", "triangle", "triangle-filled", "kite", "kite-filled"] satisfies NodeStyles["angleType"][]
    })
    public angleType?: "corner" | "triangle" | "triangle-filled" | "kite" | "kite-filled";
}

export class NodeApiType implements NodeBase {
    @ApiProperty({ type: String, format: "uuid", description: "Node unique id" })
    public id: string;

    @ApiProperty({
        type: String,
        description: "Node type",
        enum: ["sticker", "arrow", "text", "shape", "media", "note", "drawing"] satisfies NodeTypes[]
    })
    public type: "sticker" | "text" | "shape" | "arrow" | "media" | "note" | "drawing";

    @ApiProperty({ type: Boolean, description: "Node is locked flag" })
    public locked: boolean;

    @ApiProperty({ type: NodeStylesApiType, description: "Node styles" })
    public styles: NodeStyles;
}
