import { applyDecorators, UsePipes } from "@nestjs/common";
import { ApiBadRequestResponse } from "@nestjs/swagger";
import type { ZodSchema } from "zod";
import { ZodValidationPipe } from "./zod-validation.pipe";

export function Validation(schema: ZodSchema) {
    return applyDecorators(UsePipes(new ZodValidationPipe(schema)), ApiBadRequestResponse());
}
