import type { SignInDto, SignUpDto } from "@lib/auth";
import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { RefreshSessionQuery } from "./handlers/refresh-session.handler";
import { SignInCommand } from "./handlers/sign-in.handler";
import { SignUpCommand } from "./handlers/sign-up.handler";

@Injectable()
export class BasicAuthService {
    public constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus,
        @Inject(QueryBus) private readonly queryBus: QueryBus
    ) {}

    public async signUp(dto: SignUpDto) {
        return await this.commandBus.execute(new SignUpCommand(dto));
    }

    public async signIn(dto: SignInDto) {
        return await this.commandBus.execute(new SignInCommand(dto));
    }

    public async refreshSession(refreshToken: string) {
        return await this.queryBus.execute(new RefreshSessionQuery(refreshToken));
    }
}
