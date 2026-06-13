import type { Id } from "@lib/common";
import type { ExecutionContext } from "@nestjs/common";

export function getDeduplicationCacheKey(context: ExecutionContext, messageId: Id) {
    const handlerClass = context.getClass().name;

    const handlerName = context.getHandler().name;

    return `deduplication:${handlerClass}-${handlerName}:${messageId}`;
}

export const DEFAULT_DEDUPLICATION_CACHE_TTL = 600;

export const MESSAGE_ID_KEY = "messageId";

export function createDeduplicationHeaders() {
    return {
        headers: {
            [MESSAGE_ID_KEY]: crypto.randomUUID()
        }
    };
}
