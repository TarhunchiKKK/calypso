import { applyDecorators, Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { WrapGrpcResponseInterceptor } from "./wrap-grpc-response.interceptor";
import { GrpcExceptionFilter } from "./grpc-exception.filter";

export function GrpcController() {
    return applyDecorators(Controller(), UseInterceptors(WrapGrpcResponseInterceptor), UseFilters(GrpcExceptionFilter))
} 