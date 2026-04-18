import { Body } from "@nestjs/common";
import type { ZodSchema } from "zod";
import { ZodValidationPipe } from "./zod-validation.pipe";

export function Validation(schema: ZodSchema) {
    return Body(new ZodValidationPipe(schema));
}
