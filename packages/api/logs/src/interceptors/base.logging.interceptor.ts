import { CallHandler, ExecutionContext, Inject, NestInterceptor } from "@nestjs/common";
import { LokiLogger } from "entry";
import { AppLogger } from "loggers/app.logger";

export abstract class BaseLoggingInterceptor<TMetadata> implements NestInterceptor {
    protected abstract readonly contextName: string;

    public constructor(@Inject(LokiLogger) protected readonly logger: AppLogger) {}

    public abstract intercept(context: ExecutionContext, next: CallHandler);

    protected abstract getMetadata(context: ExecutionContext): TMetadata | null;

    protected incorrectContext(context: ExecutionContext, next: CallHandler) {
        const contextType = context.getType();

        const controller = context.getClass().name;

        const method = context.getHandler().name;

        this.logger.warn(`Middleware applied to ${contextType} context. Handler: "${controller}.${method}"`, { context: this.contextName });

        return next.handle();
    }
}
