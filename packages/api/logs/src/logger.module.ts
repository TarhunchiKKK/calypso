import { type DynamicModule, Module } from "@nestjs/common";
import { GrpcLoggingInterceptor } from "./interceptors/grpc.logging.interceptor";
import { HttpLoggingInterceptor } from "./interceptors/http.logging.interceptor";
import { RmqLoggingInterceptor } from "./interceptors/rmq.logging.interceptor";
import { LokiLogger } from "./loggers/loki.logger";
import { LoggerAsyncOptions, LoggerOptions } from "./config/types";
import { AppLogger } from "./loggers/app.logger";
import { selectLogger } from "./lib/select-logger.helper";
import { LOGGER_OPTIONS_INJECTION_TOKEN } from "./config/constants";

const interceptors = [HttpLoggingInterceptor, RmqLoggingInterceptor, GrpcLoggingInterceptor];

@Module({})
export class LoggerModule {
    public static forRoot(options: LoggerOptions): DynamicModule {
        return {
            module: LoggerModule,
            providers: [
                {
                    provide: LOGGER_OPTIONS_INJECTION_TOKEN,
                    useValue: options
                },
                {
                    provide: AppLogger,
                    useClass: selectLogger(options.driver)
                },
                ...interceptors
            ],
            exports: [LokiLogger]
        };
    }

    public static forRootAsync(options: LoggerAsyncOptions): DynamicModule {
        return {
            module: LoggerModule,
            imports: options.imports ?? [],
            providers: [
                {
                    provide: LOGGER_OPTIONS_INJECTION_TOKEN,
                    inject: options.inject ?? [],
                    useFactory: options.useFactory
                },
                {
                    provide: AppLogger,
                    inject: [LOGGER_OPTIONS_INJECTION_TOKEN],
                    useFactory: async (options: LoggerOptions) => {
                        const LoggerClass = selectLogger(options.driver);
                        return new LoggerClass(options);
                    }
                },
                ...interceptors
            ],
            exports: [LokiLogger]
        };
    }
}
