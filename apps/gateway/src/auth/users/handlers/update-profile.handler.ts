import type { UpdateProfileDto } from "@lib/auth";
import type { Id } from "@lib/common";
import { Inject, NotFoundException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { UsersHelper } from "../users.helper";

export class UpdateProfileCommand extends Command<void> {
    public constructor(
        public userId: Id,
        public dto: UpdateProfileDto
    ) {
        super();
    }
}

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileCommandHandler implements ICommandHandler<UpdateProfileCommand> {
    public constructor(@Inject(UsersHelper) private readonly usersHelper: UsersHelper) {}

    public async execute({ userId, dto }: UpdateProfileCommand) {
        const user = await this.usersHelper.findOneById(userId);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        await this.usersHelper.update(user, dto);
    }
}
