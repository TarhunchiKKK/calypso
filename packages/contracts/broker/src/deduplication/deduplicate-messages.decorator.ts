import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { DeduplicateMessagesInterceptor } from "./deduplicate-messages.interceptor";

export function DeduplicateMessages() {
    return applyDecorators(UseInterceptors(DeduplicateMessagesInterceptor));
}
