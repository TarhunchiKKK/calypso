import type { ConfigService } from "@nestjs/config";
import type { CacheModuleOptions } from "./di.lib";

export function cacheConfigFactory(configService: ConfigService): CacheModuleOptions {
    return {
        host: configService.getOrThrow<string>("REDIS_HOST"),
        port: +configService.getOrThrow<number>("REDIS_PORT"),
        defaultTtl: +configService.getOrThrow("REDIS_DEFAULT_TTL")
    };
}
