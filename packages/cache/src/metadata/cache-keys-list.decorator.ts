import { Reflector } from "@nestjs/core";

export type GetCacheKeysListFn = (request: any) => string[];

export const CacheKeysList = Reflector.createDecorator<GetCacheKeysListFn>();
