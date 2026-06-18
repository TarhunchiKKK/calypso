import type { ConfigService } from "@nestjs/config";
import type { LokiLoggerOptions } from "./types";

export function lokiLoggerFactory(configService: ConfigService): LokiLoggerOptions {
    return {
        envMode: configService.getOrThrow<string>("NODE_ENV"),
        appLabel: configService.getOrThrow<string>("APP_LABEL"),
        lokiUrl: configService.getOrThrow<string>("LOKI_URL")
    };
}
