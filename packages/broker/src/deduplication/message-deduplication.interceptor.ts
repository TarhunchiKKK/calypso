import { CacheService } from "@api/cache";
import type { Id } from "@lib/common";
import { type CallHandler, type ExecutionContext, Inject, Injectable, Logger, type NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { RmqContext } from "@nestjs/microservices";
import { of } from "rxjs";
import { DeduplicationTtl } from "./deduplication-ttl.decorator";
import { DEFAULT_DEDUPLICATION_CACHE_TTL, getDeduplicationCacheKey, MESSAGE_ID_KEY } from "./lib";

@Injectable()
export class DeduplicateMessageInterceptor implements NestInterceptor {
    private readonly logger = new Logger(DeduplicateMessageInterceptor.name);

    public constructor(
        @Inject(CacheService) private readonly cacheService: CacheService,
        @Inject(Reflector) private readonly reflector: Reflector
    ) {}

    public async intercept(context: ExecutionContext, next: CallHandler) {
        const rmqContext = context.switchToRpc().getContext<RmqContext>();

        const { messageId, message } = this.extractMessage(rmqContext);
        if (messageId === null) {
            return this.skip(rmqContext, message);
        }

        const cacheVerification = await this.verifyCache(context, messageId, message);
        if (!cacheVerification) {
            return this.skip(rmqContext, message);
        }

        return next.handle();
    }

    private extractMessage(rmqContext: RmqContext) {
        const message = rmqContext.getMessage();

        let messageId: Id | null = message?.properties?.headers?.[MESSAGE_ID_KEY];

        if (!messageId) {
            this.logger.error("Message id not provided.");

            messageId = null;
        }

        if (typeof messageId !== "string") {
            this.logger.error("Message id is not string.");

            messageId = null;
        }

        return { messageId, message };
    }

    private async verifyCache(context: ExecutionContext, messageId: Id, message: Record<string, unknown>) {
        const cacheKey = getDeduplicationCacheKey(context, messageId);

        const existingMessage = await this.cacheService.get(cacheKey);

        if (existingMessage) {
            this.logger.warn(`Message with id "${messageId}" already processed:`);
            this.logger.warn(message);
            return false;
        }

        const ttl = this.getTtl(context);

        await this.cacheService.set(cacheKey, message, ttl);

        return true;
    }

    private getTtl(context: ExecutionContext) {
        const handler = context.getHandler();

        const ttl = this.reflector.get(DeduplicationTtl, handler);

        if (!ttl) {
            this.logger.warn(`"DeduplicationTtl" decorator for method ${handler.name} not provided.`);

            return DEFAULT_DEDUPLICATION_CACHE_TTL;
        }

        return ttl;
    }

    private skip(rmqContext: RmqContext, message: Record<string, unknown>) {
        const channel = rmqContext.getChannelRef();

        channel.ack(message);

        return of(null);
    }
}
