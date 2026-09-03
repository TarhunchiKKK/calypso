import { Reflector } from "@nestjs/core";

// biome-ignore lint/suspicious/noExplicitAny: `any` type is necessary for inline type usage
export type GetCacheKeysListFn = (request: any) => string[];

export const CacheKeysList = Reflector.createDecorator<GetCacheKeysListFn>();
