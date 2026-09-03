import { type CanActivate, type ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { DebugException } from "@lib/common";
import { AccessRightsService } from "../access-rights.service";
import { ExtractAccess } from "./extract-access.decorator";
import { Operation } from "./operation.decorator";

@Injectable()
export class AccessRightsGuard implements CanActivate {
    public constructor(
        @Inject(AccessRightsService) private readonly accessRightsService: AccessRightsService,
        @Inject(Reflector) private readonly reflector: Reflector
    ) {}

    public async canActivate(context: ExecutionContext) {
        const accessRightDto = this.getAccessRight(context);

        const operation = this.getOperation(context);

        return await this.accessRightsService.check({
            ...accessRightDto,
            operation
        });
    }

    private getOperation(context: ExecutionContext) {
        const operation = this.reflector.get(Operation, context.getHandler());

        if (!operation) {
            throw new DebugException("AccessRightsGuard: Operation is not provided");
        }

        return operation;
    }

    private getAccessRight(context: ExecutionContext) {
        const extractAccess = this.reflector.get(ExtractAccess, context.getHandler());

        if (!extractAccess) {
            throw new DebugException("AccessRightsGuard: AccessRightsDto is not provided");
        }

        const accessRightDto = extractAccess(context.getArgByIndex(0));

        if (!accessRightDto) {
            throw new DebugException("AccessRightsGuard: AccessRightsDto is not provided");
        }

        return accessRightDto;
    }
}
