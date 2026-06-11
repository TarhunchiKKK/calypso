import type { UpdateProfileDto } from "@lib/auth";
import type { Id } from "@lib/common";
import { Inject, Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { UpdateProfileCommand } from "./handlers/update-profile.handler";

@Injectable()
export class UsersService {
    public constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

    public async update(userId: Id, dto: UpdateProfileDto) {
        return await this.commandBus.execute(new UpdateProfileCommand(userId, dto));
    }
}
