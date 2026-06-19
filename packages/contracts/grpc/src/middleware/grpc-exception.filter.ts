import { AppLogger } from "@api/logs";
import { type ArgumentsHost, Catch, type HttpException, HttpStatus, Inject } from "@nestjs/common";
import { BaseRpcExceptionFilter } from "@nestjs/microservices";
import { from, type Observable } from "rxjs";
import type { GrpcError } from "../generated";
import type { GrpcResponse } from "../types";

@Catch()
export class GrpcExceptionFilter extends BaseRpcExceptionFilter {
    protected readonly contextName = GrpcExceptionFilter.name;

    public constructor(@Inject(AppLogger) private readonly logger: AppLogger) {
        super();
    }

    public catch(exception: HttpException, host: ArgumentsHost): Observable<GrpcResponse> {
        const error = this.extractError(exception);

        this.handleError(error, host);

        return from([{ error }]);
    }

    private extractError(exception: HttpException): GrpcError {
        if ("getResponse" in exception) {
            const { message, error, statusCode } = exception.getResponse() as GrpcError;

            return {
                message: Array.isArray(message) ? message : [message],
                error,
                statusCode
            };
        }

        return {
            message: ["Unknown error"],
            error: "Unknown error",
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR
        };
    }

    private handleError(error: GrpcError, host: ArgumentsHost) {
        if (error.statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
            const rpc = host.switchToRpc();
            const data = rpc.getData;
            const context = rpc.getContext();

            this.logger.error(`Error in gRPC-handler: ${error}`, { context: this.contextName, data, grpcContext: context });
        }
    }
}
