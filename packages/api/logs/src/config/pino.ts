import pino from "pino";
import type { LokiLoggerOptions } from "./types";

export type PinoOptionsFactory = (options: LokiLoggerOptions) => pino.LoggerOptions;

export const getPinoOptionsProd: PinoOptionsFactory = (options) => {
    return {
        level: "info",
        timestamp: pino.stdTimeFunctions.isoTime,
        transport: {
            target: "pino-loki",
            options: {
                host: options.lokiUrl,
                labels: {
                    app: options.appLabel,
                    env: options.envMode
                }
            }
        }
    };
};

export const getPinoOptionsDev: PinoOptionsFactory = () => {
    return {
        level: "debug",
        timestamp: pino.stdTimeFunctions.isoTime,
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
                singleLine: true
            }
        }
    };
};
