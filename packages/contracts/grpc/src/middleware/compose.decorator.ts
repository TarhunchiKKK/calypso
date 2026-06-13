import { applyDecorators, Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { ExtractGrpcInterceptor } from "./await-grpc.interceptor";
import { GrpcExceptionFilter } from "./grpc-exception.filter";
import { WrapGrpcResponseInterceptor } from "./wrap-grpc-response.interceptor";

export function GrpcController() {
    return applyDecorators(Controller(), UseInterceptors(WrapGrpcResponseInterceptor), UseFilters(GrpcExceptionFilter));
}

export function ExtractGrpc() {
    return applyDecorators(UseInterceptors(ExtractGrpcInterceptor));
}
