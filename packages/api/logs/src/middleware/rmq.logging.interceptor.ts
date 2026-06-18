import { CallHandler, ExecutionContext, Injectable } from "@nestjs/common";
import { RmqContext } from "@nestjs/microservices";
import { BaseLoggingInterceptor } from "./base.logging.interceptor";

type Metadata = {
    context: string;
    pattern: string;
    message: Record<string, any>;
    args: ReturnType<RmqContext["getArgs"]>;
};

@Injectable()
export class RmqLoggingInterceptor extends BaseLoggingInterceptor<Metadata> {
    protected readonly contextName = RmqLoggingInterceptor.name;

    public intercept(context: ExecutionContext, next: CallHandler) {
        const metadata = this.getMetadata(context);

        if (!metadata) {
            return this.incorrectContext(context, next);
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

    protected getMetadata(context: ExecutionContext) {
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
            args: rmqContext.getArgs()
        };
    }
}
