import type { ConfigService } from "@nestjs/config";
import type { LoggerModuleOptions } from "./types";

export function loggerConfigFactory(configService: ConfigService): LoggerModuleOptions {
    const batchInterval = configService.get("LOGS_BATCH_INTERVAL");

    return {
        appName: configService.getOrThrow<string>("APP_NAME"),
        lokiUrl: configService.getOrThrow<string>("LOKI_URL"),
        envMode: configService.getOrThrow<string>("NODE_ENV"),
        batchInterval: batchInterval ? +batchInterval : undefined
    };
}
