import { Reflector } from "@nestjs/core";

type GetCacheKeyFn = (request: any) => string;

export const CacheKey = Reflector.createDecorator<GetCacheKeyFn>();
