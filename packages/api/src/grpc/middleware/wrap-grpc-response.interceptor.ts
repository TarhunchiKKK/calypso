import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from "@nestjs/common";
import { map, tap } from "rxjs";

@Injectable()
export class WrapGrpcResponseInterceptor implements NestInterceptor {
    public intercept(_: ExecutionContext, next: CallHandler) {
        console.log("start: " + _.getHandler().name);

        return next.handle().pipe(
            tap(() => console.log("end: " + _.getHandler().name)),
            map(data => ({
                data
            }))
        );
    }
}
