import type { ModuleMetadata } from "@nestjs/common";

export type LoggerModuleOptions = {
    appName: string;

    lokiUrl: string;

    envMode: unknown;

    batchInterval?: number;
};

export type LoggerModuleAsyncOptions = Pick<ModuleMetadata, "imports"> & {
    inject?: any[];

    useFactory: (...args: any) => LoggerModuleOptions | Promise<LoggerModuleOptions>;
};
