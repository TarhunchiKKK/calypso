import { dependsOnEnv } from "@lib/common";
import { Inject, Injectable, type LoggerService } from "@nestjs/common";
import { LOGGER_OPTIONS_INJECTION_TOKEN } from "../config/constants";
import { getPinoOptionsDev, getPinoOptionsProd, type PinoOptionsFactory } from "../config/pino";
import type { LokiLoggerOptions } from "../config/types";
import type { LogMetadata } from "../lib/types";
import pino from "pino";

@Injectable()
export class LokiLogger implements LoggerService {
    private pinoLogger: pino.Logger;

    public constructor(@Inject(LOGGER_OPTIONS_INJECTION_TOKEN) private readonly options: LokiLoggerOptions) {
        const pinoOptions = dependsOnEnv<PinoOptionsFactory>(options.envMode, {
            prod: getPinoOptionsProd,
            dev: getPinoOptionsDev,
            default: getPinoOptionsDev
        })(options);

        this.pinoLogger = pino(pinoOptions);
    }

    public log(message: any, metadata: LogMetadata) {
        this.pinoLogger.info(metadata, `[${metadata.context}]: ${message}`);
    }

    public error(message: any, metadata: LogMetadata) {
        this.pinoLogger.error(metadata, `[${metadata.context}]: ${message}`);
    }

    public warn(message: any, metadata: LogMetadata) {
        this.pinoLogger.warn(metadata, `[${metadata.context}]: ${message}`);
    }

    public debug(message: any, metadata: LogMetadata) {
        this.pinoLogger.debug(metadata, `[${metadata.context}]: ${message}`);
    }

    public verbose(message: any, metadata: LogMetadata) {
        this.pinoLogger.trace(metadata, `[${metadata.context}]: ${message}`);
    }

    public fatal(message: any, metadata: LogMetadata) {
        this.pinoLogger.fatal(metadata, `[${metadata.context}]: ${message}`);
    }
}
