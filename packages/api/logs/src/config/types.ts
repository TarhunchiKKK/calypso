import type { ModuleMetadata } from "@nestjs/common";

export type LokiLoggerOptions = {
    envMode: unknown;

    appLabel: string;

    lokiUrl: string;
};

export type LokiLoggerAsyncOptions = Pick<ModuleMetadata, "imports"> & {
    inject?: any[];
    useFactory: (...args: any[]) => LokiLoggerOptions | Promise<LokiLoggerOptions>;
};
