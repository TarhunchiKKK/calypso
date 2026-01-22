import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiNotFoundResponse, ApiProperty } from "@nestjs/swagger";
import { HttpErrorResponse } from "./http-error.response";

class NotFoundResponse extends HttpErrorResponse {
    @ApiProperty({ description: "Http status code", enum: [HttpStatus.NOT_FOUND], type: Number })
    public statusCode: HttpStatus.NOT_FOUND;
}

export function ApiNotFound(description: string) {
    return applyDecorators(ApiNotFoundResponse({ description, type: NotFoundResponse }));
}
