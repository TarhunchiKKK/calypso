import { Reflector } from "@nestjs/core";

/**
 * Marker decorator. Indicates that caching or disabling
 * this method is implemented manually inside the service via CacheService.
 * @param reason Optional comment on why manual mode is used
 */
export const ManualCaching = Reflector.createDecorator<string | undefined>();
