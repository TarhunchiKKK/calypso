import {
    applyDecorators,
    type CallHandler,
    type ExecutionContext,
    Injectable,
    Logger,
    type NestInterceptor,
    UseInterceptors
} from "@nestjs/common";
import type { RmqContext } from "@nestjs/microservices";
import { catchError, tap, throwError } from "rxjs";
import { BrokerAcknowledgementService } from "./broker-acknowledgement.service";

type Options = {
    loggerContext?: string;

    requeue: boolean;
};

@Injectable()
class BrokerAcknowledgementInterceptor implements NestInterceptor {
    private readonly logger: Logger;

    private readonly brokerService = new BrokerAcknowledgementService();

    public constructor(private readonly options: Options) {
        this.logger = new Logger(options.loggerContext ?? BrokerAcknowledgementInterceptor.name, { timestamp: true });
    }

    public intercept(context: ExecutionContext, next: CallHandler) {
        const rmqContext = this.getRmqContext(context);
        const pattern = context.getHandler().name;

        if (!rmqContext) {
            return next.handle();
        }

        return next.handle().pipe(
            tap(() => this.brokerService.ack(rmqContext)),
            catchError(error => {
                this.logger.error(` ${pattern}: ${error}`);

                this.brokerService.nack(rmqContext, this.options.requeue);

                return throwError(() => error);
            })
        );
    }

    private getRmqContext(context: ExecutionContext): RmqContext | null {
        const args = context.getArgs();

        for (const arg of args) {
            if (arg && typeof arg === "object" && arg.getChannelRef) {
                return arg as RmqContext;
            }
        }

        for (const arg of args) {
            if (arg && typeof arg === "object") {
                for (const key of Object.keys(arg)) {
                    const value = arg[key];
                    if (value && typeof value === "object" && value.getChannelRef) {
                        return value as RmqContext;
                    }
                }
            }
        }

        return null;
    }
}

export function BrokerAcknowledgement(options: Options) {
    return applyDecorators(UseInterceptors(new BrokerAcknowledgementInterceptor(options)));
}
