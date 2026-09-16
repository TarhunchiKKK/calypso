import { type CallHandler, type ExecutionContext, Injectable } from "@nestjs/common";
import { tap } from "rxjs";
import { BaseLoggingInterceptor } from "./base.logging.interceptor";

type Metadata = {
    metadata: {
        context: string;
        method: string;
        url: string;
    };
    request: any;
    response: any;
};

@Injectable()
export class HttpLoggingInterceptor extends BaseLoggingInterceptor<Metadata> {
    protected readonly contextName = HttpLoggingInterceptor.name;

    public intercept(context: ExecutionContext, next: CallHandler) {
        const metadataExists = this.getMetadata(context);

        if (!metadataExists) {
            return this.incorrectContext(context, next);
        }

        const { metadata, request, response } = metadataExists;

        this.logger.debug(`HTTP Request Started: ${metadata.method} ${metadata.url}`, metadata);

        const startTime = Date.now();

        return next.handle().pipe(
            tap(() => {
                const duration = Date.now() - startTime;

                this.logger.log(`HTTP method: ${request.method} ${request.url} - ${response.statusCode} (${duration}ms)`, metadata);
            })
        );
    }

    protected getMetadata(context: ExecutionContext) {
        const http = context.switchToHttp();
        const request = http.getRequest();
        const response = http.getResponse();

        if (context.getType() !== "http") {
            return null;
        }

        const metadata = {
            method: request.method,
            url: request.url,
            context: this.contextName
        };

        return { metadata, request, response };
    }
}
