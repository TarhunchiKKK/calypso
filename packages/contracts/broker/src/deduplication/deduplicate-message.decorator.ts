import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { DeduplicateMessageInterceptor } from "./message-deduplication.interceptor";

export function DeduplicateMessages() {
    return applyDecorators(UseInterceptors(DeduplicateMessageInterceptor));
}
