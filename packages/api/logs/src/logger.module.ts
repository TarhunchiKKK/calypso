import { dependsOnEnv } from "@lib/common";
import { type DynamicModule, Module } from "@nestjs/common";
import { type PinoConfigFactory, pinoConfigFactoryDev, pinoConfigFactoryProd } from "config/factories";
import type { LoggerModuleOptions } from "config/types";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";

@Module({})
export class LoggerModule {
    public static forRoot(options: LoggerModuleOptions): DynamicModule {
        return {
            module: LoggerModule,
            imports: [
                PinoLoggerModule.forRoot({
                    pinoHttp: dependsOnEnv<PinoConfigFactory>(options.envMode, {
                        prod: pinoConfigFactoryProd,
                        dev: pinoConfigFactoryDev
                    })(options)
                })
            ],
            exports: [PinoLoggerModule]
        };
    }
}
