import { Reflector } from "@nestjs/core";

export const Operation = Reflector.createDecorator<string>();
