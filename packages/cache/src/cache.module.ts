import { type DynamicModule, Global, Module, type Provider } from "@nestjs/common";
import { CacheService } from "cache.service";
import { CACHE_OPTIONS_INJECTION_TOKEN, type CacheModuleAsyncOptions, type CacheModuleOptions } from "config/di.lib";
import { CacheInterceptor } from "middleware/cache.interceptor";
import { InvalidateCacheInterceptor } from "middleware/invalidate-cache.interceptor";

@Global()
@Module({
    providers: [CacheService, CacheInterceptor, InvalidateCacheInterceptor],
    exports: [CacheService, CacheInterceptor, InvalidateCacheInterceptor]
})
export class CacheModule {
    public static forRoot(options: CacheModuleOptions): DynamicModule {
        return {
            module: CacheModule,
            providers: [
                {
                    provide: CACHE_OPTIONS_INJECTION_TOKEN,
                    useValue: options
                },
                CacheService,
                CacheInterceptor,
                InvalidateCacheInterceptor
            ],
            exports: [CacheService, CacheInterceptor, InvalidateCacheInterceptor]
        };
    }

    public static forRootAsync(options: CacheModuleAsyncOptions): DynamicModule {
        return {
            module: CacheModule,
            imports: options.imports || [],
            providers: [CacheModule.createAsyncOptionsProvider(options), CacheService, CacheInterceptor, InvalidateCacheInterceptor],
            exports: [CacheService, CacheInterceptor, InvalidateCacheInterceptor]
        };
    }

    private static createAsyncOptionsProvider(options: CacheModuleAsyncOptions): Provider {
        if (!options.useFactory) {
            throw new Error("'useFactory' method for 'CacheModule' class not provided.");
        }

        return {
            provide: CACHE_OPTIONS_INJECTION_TOKEN,
            inject: options.inject || [],
            useFactory: options.useFactory
        };
    }
}
