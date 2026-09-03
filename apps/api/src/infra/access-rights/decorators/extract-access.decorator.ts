import { Reflector } from "@nestjs/core";
import type { Id } from "@lib/common";

// biome-ignore lint/suspicious/noExplicitAny: `any` type is needed for `args` param inline type providing
export type ExtractAccessFunction = (args: any) => { resourceId: Id; userId: Id };

export const ExtractAccess = Reflector.createDecorator<ExtractAccessFunction>();
