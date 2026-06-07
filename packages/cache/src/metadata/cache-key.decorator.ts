import { Reflector } from "@nestjs/core";

export type GetCacheKeyFn = (request: any) => string;

export const CacheKey = Reflector.createDecorator<GetCacheKeyFn>();
