import type { ModuleMetadata } from "@nestjs/common";

export type LokiLoggerOptions = {
    driver: "loki";

    envMode: unknown;

    appLabel: string;

    lokiUrl: string;
};

export type LoggerOptions = LokiLoggerOptions;

export type LoggerDriver = LoggerOptions["driver"];

export type LoggerAsyncOptions = Pick<ModuleMetadata, "imports"> & {
    inject?: any[];
    useFactory: (...args: any[]) => LoggerOptions | Promise<LoggerOptions>;
};
