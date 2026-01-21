import { Injectable } from "@nestjs/common";
import type { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { SignInRequest } from "./dto/sign-in.request";
import type { SignUpRequest } from "./dto/sign-up.request";
import { FindAccountQuery } from "./handlers/find-account.handler";
import { RemoveAccountCommand } from "./handlers/remove-account.handler";
import { SignInCommand } from "./handlers/sign-in.handler";
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

    public async signIn(request: SignInRequest) {
        return await this.commandBus.execute(new SignInCommand(request));
    }

    public async findOne(username: string) {
        return await this.queryBus.execute(new FindAccountQuery(username));
    }

    public async remove(username: string) {
        return await this.commandBus.execute(new RemoveAccountCommand(username));
    }
}
