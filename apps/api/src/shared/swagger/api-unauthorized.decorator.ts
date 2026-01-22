import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiProperty, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { HttpErrorResponse } from "./http-error.response";

class UnauthorizedResponse extends HttpErrorResponse {
    @ApiProperty({ description: "Http status code", enum: [HttpStatus.UNAUTHORIZED], type: Number })
    public statusCode: HttpStatus.UNAUTHORIZED;
}

export function ApiUnauthorized(description: string) {
    return applyDecorators(ApiUnauthorizedResponse({ description, type: UnauthorizedResponse }));
}
