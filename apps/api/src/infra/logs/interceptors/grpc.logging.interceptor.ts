import { type CallHandler, type ExecutionContext, Injectable } from "@nestjs/common";
import { tap } from "rxjs";
import { BaseLoggingInterceptor } from "./base.logging.interceptor";

type Metadata = {
    data: unknown;
    context: unknown;
    handler: string;
};

@Injectable()
export class GrpcLoggingInterceptor extends BaseLoggingInterceptor<Metadata> {
    protected readonly contextName = GrpcLoggingInterceptor.name;

    public intercept(context: ExecutionContext, next: CallHandler) {
        const metadata = this.getMetadata(context);

        if (!metadata) {
            return this.incorrectContext(context, next);
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
            data: data,
            context: grpcContext,
            handler: `${controller}.${handler}`
        };
    }
}
