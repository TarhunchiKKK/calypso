import { type DynamicModule, Module } from "@nestjs/common";
import type { LokiLoggerAsyncOptions, LokiLoggerOptions } from "config/types";
import { LokiLogger } from "loggers/loki.logger";
import { GrpcLoggingInterceptor } from "middleware/grpc.logging.interceptor";
import { HttpLoggingInterceptor } from "middleware/http.logging.interceptor";
import { RmqLoggingInterceptor } from "middleware/rmq.logging.interceptor";

const interceptors = [HttpLoggingInterceptor, RmqLoggingInterceptor, GrpcLoggingInterceptor];

@Module({})
export class LoggerModule {
    public static forRoot(options: LokiLoggerOptions): DynamicModule {
        return {
            module: LoggerModule,
            providers: [
                {
                    provide: LokiLogger,
                    useValue: new LokiLogger(options)
                },
                ...interceptors
            ],
            exports: [LokiLogger]
        };
    }

    public static forRootAsync(options: LokiLoggerAsyncOptions): DynamicModule {
        return {
            module: LoggerModule,
            imports: options.imports ?? [],
            providers: [
                {
                    provide: LokiLogger,
                    inject: options.inject ?? [],
                    useFactory: async (...args) => {
                        const lokiLoggerOptions = await options.useFactory(...args);
                        return new LokiLogger(lokiLoggerOptions);
                    }
                },
                ...interceptors
            ],
            exports: [LokiLogger]
        };
    }
}
