import type { PipeTransform } from "@nestjs/common";
import type { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
    public constructor(private readonly schema: ZodSchema) {}

    public transform(value: unknown) {
        return this.schema.parse(value);
    }
}
