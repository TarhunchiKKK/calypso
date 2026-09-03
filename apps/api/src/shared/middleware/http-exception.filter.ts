import { type ArgumentsHost, Catch, type ExceptionFilter, type HttpException, HttpStatus, Inject } from "@nestjs/common";
import { AppLogger } from "src/infra/logs/loggers/app.logger";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly contextName = HttpExceptionFilter.name;

    public constructor(@Inject(AppLogger) private readonly logger: AppLogger) {}

    public catch(exception: HttpException, host: ArgumentsHost) {
        const error = this.extractError(exception);

        this.handleError(error, host);
    }

    private extractError(exception: HttpException) {
        return {
            message: exception?.message ?? "Unknown error",
            statusCode: exception?.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR,
            error: exception
        };
    }

    private handleError(error: ReturnType<typeof this.extractError>, host: ArgumentsHost) {
        if (typeof error.statusCode === "number" && error.statusCode < HttpStatus.INTERNAL_SERVER_ERROR) {
            return;
        }

        const http = host.switchToHttp();
        const request = http.getRequest();
        const response = http.getResponse();

        this.logger.error(`Error in HTTP endpoint`, {
            context: this.contextName,
            error: error,
            request,
            response
        });
    }
}
