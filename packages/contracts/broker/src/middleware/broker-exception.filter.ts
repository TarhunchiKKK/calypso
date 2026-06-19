import { AppLogger } from "@api/logs";
import { type ArgumentsHost, Catch, type HttpException, HttpStatus, Inject } from "@nestjs/common";
import { BaseRpcExceptionFilter, type RmqContext } from "@nestjs/microservices";
import { of } from "rxjs";

@Catch()
export class BrokerExceptionFilter extends BaseRpcExceptionFilter {
    protected readonly contextName = BrokerExceptionFilter.name;

    public constructor(@Inject(AppLogger) private readonly logger: AppLogger) {
        super();
    }

    public catch(exception: HttpException, host: ArgumentsHost) {
        const error = this.extractError(exception);

        this.handleError(error, host);

        return of(null);
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

        const context = host.switchToRpc().getContext<RmqContext>();

        const pattern = context.getPattern();
        const message = context.getMessage();
        const args = context.getArgs();

        this.logger.error(`Error in RabbitMQ handler "${pattern}"`, {
            context: this.contextName,
            error: error,
            pattern,
            args,
            message
        });
    }
}
