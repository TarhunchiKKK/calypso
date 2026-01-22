import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiForbiddenResponse, ApiProperty } from "@nestjs/swagger";
import { HttpErrorResponse } from "./http-error.response";

class ForbiddenResponse extends HttpErrorResponse {
    @ApiProperty({ description: "Http status code", enum: [HttpStatus.FORBIDDEN], type: Number })
    public statusCode: HttpStatus.FORBIDDEN;
}

export function ApiForbidden(description: string) {
    return applyDecorators(ApiForbiddenResponse({ description, type: ForbiddenResponse }));
}
