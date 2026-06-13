import { Reflector } from "@nestjs/core";

export const DeduplicationTtl = Reflector.createDecorator<number>();
