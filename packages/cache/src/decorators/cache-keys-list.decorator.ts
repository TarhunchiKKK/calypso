import { Reflector } from "@nestjs/core";

type GetCacheKeysFn = (request: any) => string[];

export const CacheKeysList = Reflector.createDecorator<GetCacheKeysFn>();
