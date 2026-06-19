import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { GrpcLoggingInterceptor } from "../interceptors/grpc.logging.interceptor";
import { HttpLoggingInterceptor } from "../interceptors/http.logging.interceptor";
import { RmqLoggingInterceptor } from "../interceptors/rmq.logging.interceptor";

const middlewaresMap = {
    http: {
        interceptors: [HttpLoggingInterceptor]
    },
    broker: {
        interceptors: [RmqLoggingInterceptor]
    },
    grpc: {
        interceptors: [GrpcLoggingInterceptor]
    }
};

export function Logging(contextType: keyof typeof middlewaresMap) {
    const middlewares = middlewaresMap[contextType];

    if (!middlewares) {
        throw new Error(`Unknown context type: "${contextType}"`);
    }

    return applyDecorators(UseInterceptors(...middlewares.interceptors));
}
