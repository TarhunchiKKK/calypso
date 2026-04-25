import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";

@Injectable()
export class WrapGrpcResponseInterceptor implements NestInterceptor {
    public intercept(_: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            map(data => ({
                data: data ?? {}
            }))
        );
    }
}
