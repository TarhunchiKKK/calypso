import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { CacheOptionsFactory } from "src/infra/cache/config/di.lib";

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    public createCacheOptions() {
        return {
            host: this.configService.getOrThrow<string>("REDIS_HOST"),
            port: +this.configService.getOrThrow<number>("REDIS_PORT"),
            defaultTtl: +this.configService.getOrThrow("REDIS_DEFAULT_TTL")
        };
    }
}
