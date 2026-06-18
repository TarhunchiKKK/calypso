import { type CallHandler, type ExecutionContext, Inject, Injectable, type NestInterceptor } from "@nestjs/common";
import { LokiLogger } from "entry";
import { TRACE_ID_HTTP_HEADER } from "lib/constants";
import { tap } from "rxjs";

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
    private contextName = HttpLoggingInterceptor.name;

    public constructor(@Inject(LokiLogger) private readonly logger: LokiLogger) {}

    public intercept(context: ExecutionContext, next: CallHandler) {
        const { request, response, metadata } = this.getMetadata(context);

        if (!metadata) {
            const controller = context.getClass().name;
            const method = context.getHandler().name;

            this.logger.warn(`Middleware was applied to non-http method "${controller}.${method}"`, { context: this.contextName });
            return next.handle();
        }

        this.logger.debug(`HTTP Request Started: ${metadata.method} ${metadata.url}`, metadata);

        const startTime = Date.now();

        return next.handle().pipe(
            tap(() => {
                const duration = Date.now() - startTime;

                this.logger.log(`HTTP method: ${request.method} ${request.url} - ${response.statusCode} (${duration}ms)`, metadata);
            })
        );
    }

    private getMetadata(context: ExecutionContext) {
        const http = context.switchToHttp();
        const request = http.getRequest();
        const response = http.getResponse();

        if (context.getType() !== "http") {
            return { request, response };
        }

        const metadata = {
            traceId: request.headers[TRACE_ID_HTTP_HEADER] ?? crypto.randomUUID(),
            method: request.method,
            url: request.url,
            context: this.contextName
        };

        response.setHeader(TRACE_ID_HTTP_HEADER, metadata.traceId);

        return { metadata, request, response };
    }
}
