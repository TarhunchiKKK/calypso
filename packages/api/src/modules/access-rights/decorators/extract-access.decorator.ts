import { Reflector } from "@nestjs/core";
import type { Id } from "@repo/common";

export type ExtractAccessFunction = (data: unknown) => { resourceId: Id; userId: Id };

export const ExtractAccess = Reflector.createDecorator<ExtractAccessFunction>();
