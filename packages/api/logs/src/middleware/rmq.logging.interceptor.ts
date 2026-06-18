import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { LokiLogger } from "entry";
import { Observable, tap } from "rxjs";
import { RmqContext } from "@nestjs/microservices";

@Injectable()
export class RmqLoggingInterceptor implements NestInterceptor {
    private readonly contextName = RmqLoggingInterceptor.name;

    public constructor(@Inject(LokiLogger) private readonly logger: LokiLogger) {}

    public intercept(context: ExecutionContext, next: CallHandler) {
        const metadata = this.getMetadata(context);

        if (!metadata) {
            const controller = context.getClass().name;
            const method = context.getHandler().name;

            this.logger.warn(`Middleware was applied to non-RabbitMQ handler "${controller}.${method}"`, { context: this.contextName });
            return next.handle();
        }

        const startTime = Date.now();

        this.logger.debug(`RabbitMQ message received on "${metadata.pattern}": ${metadata.message}`, metadata);

        return next.handle().pipe(
            tap(() => {
                const duration = Date.now() - startTime;

                this.logger.log(`RabbitMQ handler: ${metadata.pattern} (${duration}ms)`, metadata);
            })
        );
    }

    private getMetadata(context: ExecutionContext) {
        if (context.getType() !== "rpc") {
            return null;
        }

        const rmq = context.switchToRpc();
        const rmqContext = rmq.getContext<RmqContext>();

        if (!rmqContext || typeof rmqContext.getChannelRef !== "function") {
            return null;
        }

        return {
            context: this.contextName,
            pattern: rmqContext.getPattern(),
            message: rmqContext.getMessage(),
            args: rmqContext.getArgs(),
            data: rmq.getData()
        };
    }
}
