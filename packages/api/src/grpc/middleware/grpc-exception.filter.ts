import { Catch, type HttpException, HttpStatus, Logger } from "@nestjs/common";
import { BaseRpcExceptionFilter } from "@nestjs/microservices";
import { from, type Observable } from "rxjs";
import type { GrpcError } from "../generated";
import type { GrpcResponse } from "../types";

@Catch()
export class GrpcExceptionFilter extends BaseRpcExceptionFilter {
    public catch(exception: HttpException): Observable<GrpcResponse> {
        Logger.error(exception);

        if ("getResponse" in exception) {
            const { message, error, statusCode } = exception.getResponse() as GrpcError;

            return from([
                {
                    error: {
                        message: Array.isArray(message) ? message : [message],
                        error,
                        statusCode
                    }
                }
            ]);
        }

        return from([
            {
                error: {
                    message: ["Unknown error"],
                    error: "Unknown error",
                    statusCode: HttpStatus.BAD_REQUEST
                }
            }
        ]);
    }
}
