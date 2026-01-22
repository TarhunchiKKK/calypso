import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiConflictResponse, ApiProperty } from "@nestjs/swagger";
import { HttpErrorResponse } from "./http-error.response";

class ConflictResponse extends HttpErrorResponse {
    @ApiProperty({ description: "Conflict reason", enum: [HttpStatus.CONFLICT], type: Number })
    public statusCode: HttpStatus.CONFLICT;
}

export function ApiConflict(description: string) {
    return applyDecorators(ApiConflictResponse({ description, type: ConflictResponse }));
}
