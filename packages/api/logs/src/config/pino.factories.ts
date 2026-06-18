import type { Params } from "nestjs-pino";
import type { LoggerModuleOptions } from "./types";

const DEFAULT_BATCH_INTERVAL = 10;

export type PinoConfigFactory = (options: LoggerModuleOptions) => Params;

export const pinoConfigFactoryProd: PinoConfigFactory = (options) => {
    return {
        pinoHttp: {
            level: "info",
            transport: {
                target: "pino-loki",
                options: {
                    host: options.lokiUrl,
                    labels: {
                        app: options.appName,
                        batching: true,
                        interval: options.batchInterval ?? DEFAULT_BATCH_INTERVAL
                    }
                }
            }
        }
    };
};

export const pinoConfigFactoryDev: PinoConfigFactory = () => {
    return {
        pinoHttp: {
            level: "debug",
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true
                }
            }
        }
    };
};
