import { Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseRpcExceptionFilter } from "@nestjs/microservices";
import { ErrorGrpcResponse } from "../generated";
import { from, Observable } from "rxjs";
import { GrpcResponse } from "../types";

@Catch()
export class GrpcExceptionFilter extends BaseRpcExceptionFilter {
    public catch(exception: HttpException): Observable<GrpcResponse> {
        if ("getResponse" in exception) {
            const { message, error, statusCode } = exception.getResponse() as ErrorGrpcResponse;

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