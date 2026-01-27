import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiProperty } from "@nestjs/swagger";

class ZodIssueResponse {
    @ApiProperty({ description: "PAth to field", example: ["username"], type: [String] })
    public path: string[];

    @ApiProperty({ description: "Error reason", example: "Invalid input: expected string", type: String })
    public message: string;

    @ApiProperty({ description: "Error code", example: "invalid_type", type: String })
    public code: string;
}

class ValidationFailedResponse {
    @ApiProperty({ description: "Fields validation errors", type: [ZodIssueResponse] })
    public issues: ZodIssueResponse[];
}

export function ApiValidationFailed() {
    return applyDecorators(ApiBadRequestResponse({ description: "Validation failed", type: ValidationFailedResponse }));
}
