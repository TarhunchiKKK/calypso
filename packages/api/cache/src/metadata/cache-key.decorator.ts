import { Reflector } from "@nestjs/core";

// biome-ignore lint/suspicious/noExplicitAny: `any` type is necessary for inline type usage
export type GetCacheKeyFn = (request: any) => string;

export const CacheKey = Reflector.createDecorator<GetCacheKeyFn>();
