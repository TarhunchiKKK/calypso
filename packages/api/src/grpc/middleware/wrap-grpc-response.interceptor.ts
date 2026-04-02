import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";

@Injectable()
export class WrapGrpcResponseInterceptor implements NestInterceptor {
    public intercept(_: ExecutionContext, next: CallHandler<any>) {
        return next.handle().pipe(
            map(data => ({
                data
            }))
        );
    }
}
