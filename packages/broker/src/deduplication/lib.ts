import type { Id } from "@lib/common";
import type { ExecutionContext } from "@nestjs/common";

export function getDeduplicationCacheKey(context: ExecutionContext, messageId: Id) {
    const handlerClass = context.getClass().name;

    const handlerName = context.getHandler().name;

    return `deduplication:${handlerClass}-${handlerName}:${messageId}`;
}

export const DEFAULT_DEDUPLICATION_CACHE_TTL = 600;

export const MESSAGE_ID_KEY = "broker_message_deduplication_id";

export function withMessageId<T extends Record<string, unknown>>(dto: T) {
    return {
        ...dto,
        [MESSAGE_ID_KEY]: crypto.randomUUID()
    };
}
