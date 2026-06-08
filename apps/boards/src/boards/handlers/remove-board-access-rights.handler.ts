import { AccessRightsService } from "@api/common";
import { Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { Id } from "@lib/common";

export class RemoveBoardAccessRightsCommand extends Command<void> {
    public constructor(public boardId: Id) {
        super();
    }
}

@CommandHandler(RemoveBoardAccessRightsCommand)
export class RemoveBoardAccessRightsCommandHandler implements ICommandHandler<RemoveBoardAccessRightsCommand> {
    public constructor(@Inject(AccessRightsService) private readonly accessRightsService: AccessRightsService) {}

    public async execute({ boardId }: RemoveBoardAccessRightsCommand) {
        await this.accessRightsService.removeAllByResource(boardId);
    }
}
