import type { BullRootModuleOptions, SharedBullConfigurationFactory } from "@nestjs/bullmq";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    public createSharedConfiguration(): BullRootModuleOptions {
        return {
            connection: {
                host: this.configService.getOrThrow<string>("REDIS_HOST"),
                port: +this.configService.getOrThrow<number>("REDIS_PORT")
            }
        };
    }
}
