import { dependsOnEnv } from "@lib/common";
import { type DynamicModule, Module } from "@nestjs/common";
import { type PinoConfigFactory, pinoConfigFactoryDev, pinoConfigFactoryProd } from "config/pino.factories";
import type { LoggerModuleAsyncOptions, LoggerModuleOptions } from "config/types";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";

@Module({})
export class LoggerModule {
    public static forRoot(options: LoggerModuleOptions): DynamicModule {
        return {
            module: LoggerModule,
            imports: [
                PinoLoggerModule.forRoot(
                    dependsOnEnv<PinoConfigFactory>(options.envMode, {
                        prod: pinoConfigFactoryProd,
                        dev: pinoConfigFactoryDev
                    })(options)
                )
            ],
            exports: [PinoLoggerModule]
        };
    }

    public static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule {
        return {
            module: LoggerModule,
            imports: [
                PinoLoggerModule.forRootAsync({
                    imports: options.imports || [],
                    inject: options.inject || [],
                    useFactory: async (...args: any[]) => {
                        const loggerOptions = await options.useFactory(...args);

                        return dependsOnEnv<PinoConfigFactory>(loggerOptions.envMode, {
                            prod: pinoConfigFactoryProd,
                            dev: pinoConfigFactoryDev
                        })(loggerOptions);
                    }
                })
            ],
            exports: [PinoLoggerModule]
        };
    }
}
