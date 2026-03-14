import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { NodeBaseDto } from "./core/node-base.dto";
import { ShapeNodeDto } from "./variants/shape-node.dto";
import { StickerNodeDto } from "./variants/sticker-node.dto";
import { TextNodeDto } from "./variants/text-node.dto";

export class NodesArray {
    @IsArray({ message: "Nodes should be provided in array notation" })
    @ValidateNested({ each: true })
    @Type(() => NodeBaseDto, {
        discriminator: {
            property: "type",
            subTypes: [
                { name: "sticker", value: StickerNodeDto },
                { name: "text", value: TextNodeDto },
                { name: "shape", value: ShapeNodeDto }
            ]
        }
    })
    public data: NodeBaseDto[];
}
