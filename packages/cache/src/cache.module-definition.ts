import { ConfigurableModuleBuilder } from "@nestjs/common";

export type CacheModuleOptions = {
    host: string;

    port: number;

    password?: string;

    defautltTtl: number;
};

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<CacheModuleOptions>().setClassMethodName("forRoot").build();
