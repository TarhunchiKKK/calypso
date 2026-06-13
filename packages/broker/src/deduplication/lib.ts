export const DEDUPLICATION_CACHE_PREFIX = "messages:deduplication";

export const DEFAULT_DEDUPLICATION_CACHE_TTL = 600;

export const MESSAGE_ID_KEY = "messageId";

export function createDeduplicationHeaders() {
    return {
        headers: {
            [MESSAGE_ID_KEY]: crypto.randomUUID()
        }
    };
}
