import { Reflector } from "@nestjs/core";

export type CacheKeyDecoratorFn = (request: any) => string;

export const CacheKey = Reflector.createDecorator<CacheKeyDecoratorFn>();
