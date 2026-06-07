import { Global, Module } from "@nestjs/common";
import { ConfigurableModuleClass } from "cache.module-definition";
import { CacheService } from "cache.service";
import { CacheInterceptor } from "middleware/cache.interceptor";
import { InvalidateCacheInterceptor } from "middleware/invalidate-cache.interceptor";

@Global()
@Module({
    providers: [CacheService, CacheInterceptor, InvalidateCacheInterceptor],
    exports: [CacheService, CacheInterceptor, InvalidateCacheInterceptor]
})
export class CacheModule extends ConfigurableModuleClass {}
