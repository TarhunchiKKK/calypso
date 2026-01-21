import { Injectable } from "@nestjs/common";
import type { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { SignUpRequest } from "./dto/sign-up.request";
import { SignUpCommand } from "./handlers/sign-up.handler";

@Injectable()
export class AuthService {
    public constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    public async signUp(request: SignUpRequest) {
        return await this.commandBus.execute(new SignUpCommand(request));
    }
}
