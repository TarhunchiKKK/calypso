import { Reflector } from "@nestjs/core";

export const CacheTtl = Reflector.createDecorator<number>();
