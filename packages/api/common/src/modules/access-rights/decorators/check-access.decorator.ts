import { applyDecorators, UseGuards } from "@nestjs/common";
import { AccessRightsGuard } from "./access-rights.guard";
import { ExtractAccess, type ExtractAccessFunction } from "./extract-access.decorator";
import { Operation } from "./operation.decorator";

type Options = {
    extract: ExtractAccessFunction;

    operation: string;
};

export function CheckAccess(options: Options) {
    return applyDecorators(Operation(options.operation), ExtractAccess(options.extract), UseGuards(AccessRightsGuard));
}
