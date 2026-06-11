import { ZodValidationPipe } from "@api/common";
import { createParamDecorator } from "@nestjs/common";
import { Payload } from "@nestjs/microservices";
import type { ZodSchema } from "zod";

export const BrokerValidation = createParamDecorator((schema?: ZodSchema) => {
    if (schema) {
        return Payload(new ZodValidationPipe(schema));
    }

    return Payload;
});
