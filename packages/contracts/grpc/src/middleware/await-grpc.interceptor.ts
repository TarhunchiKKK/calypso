import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from "@nestjs/common";
import { firstValueFrom, map, Observable } from "rxjs";

@Injectable()
export class ExtractGrpcInterceptor implements NestInterceptor {
    public intercept(_: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            map(async (data) => {
                if (data instanceof Observable) {
                    return await firstValueFrom(data);
                }

                return data;
            })
        );
    }
}
