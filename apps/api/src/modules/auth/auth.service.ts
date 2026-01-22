import { Injectable } from "@nestjs/common";
import type { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { SignInDto } from "./dto/sign-in.dto";
import type { SignUpDto } from "./dto/sign-up.dto";
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

    public async signUp(dto: SignUpDto) {
        return await this.commandBus.execute(new SignUpCommand(dto));
    }

    public async signIn(dto: SignInDto) {
        return await this.commandBus.execute(new SignInCommand(dto));
    }

    public async findOne(dto: string) {
        return await this.queryBus.execute(new FindAccountQuery(dto));
    }

    public async removeOne(dto: string) {
        return await this.commandBus.execute(new RemoveAccountCommand(dto));
    }
}
