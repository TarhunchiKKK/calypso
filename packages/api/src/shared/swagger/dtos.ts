import type { PaginationOptions } from "@lib/common";
import { ApiProperty } from "@nestjs/swagger";

export class EmptyApiType {}

export class PaginationOptionsApiType implements PaginationOptions {
    @ApiProperty({ type: Number, format: "int32", minimum: 0, description: "Page to select" })
    public page: number;

    @ApiProperty({ type: Number, format: "int32", minimum: 1, description: "Count to select" })
    public count: number;
}
