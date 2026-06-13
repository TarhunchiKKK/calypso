import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { DeduplicateMessageInterceptor } from "./message-deduplication.interceptor";

export function DeduplicateMessage() {
    return applyDecorators(UseInterceptors(DeduplicateMessageInterceptor));
}
