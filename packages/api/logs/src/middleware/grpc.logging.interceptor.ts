import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { LokiLogger } from "entry";
import { tap } from "rxjs";

@Injectable()
export class GrpcLoggingInterceptor implements NestInterceptor {
    private readonly contextName = GrpcLoggingInterceptor.name;

    public constructor(@Inject(LokiLogger) private readonly logger: LokiLogger) {}

    public intercept(context: ExecutionContext, next: CallHandler<any>) {
        const metadata = this.getMetadata(context);

        if (!metadata) {
            const controller = context.getClass().name;
            const method = context.getHandler().name;

            this.logger.warn(`Middleware was applied to non-grpc handler "${controller}.${method}"`, { context: this.contextName });
            return next.handle();
        }

        const startTime = Date.now();

        this.logger.debug(`Grpc call on "${metadata.handler}"`, metadata);

        return next.handle().pipe(
            tap(() => {
                const duration = Date.now() - startTime;

                this.logger.log(`Grpc call on ${metadata.handler} - (${duration}ms)`, metadata);
            })
        );
    }

    public getMetadata(context: ExecutionContext) {
        if (context.getType() !== "rpc") {
            return null;
        }

        const rpc = context.switchToRpc();
        const data = rpc.getData();
        const grpcContext = rpc.getContext();

        if (!grpcContext) {
            return null;
        }

        const controller = context.getHandler().name;
        const handler = context.getHandler().name;

        return {
            data,
            context: grpcContext,
            handler: `${controller}.${handler}`
        };
    }
}
