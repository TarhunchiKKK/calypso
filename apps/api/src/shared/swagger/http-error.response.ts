import type { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class HttpErrorResponse {
    @ApiProperty({ description: "Error reason", example: "Error reason", type: String })
    public message: string;

    public statusCode: HttpStatus;
}
