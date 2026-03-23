import { Injectable } from "@nestjs/common";
import type { CommandBus } from "@nestjs/cqrs";
import type { SignInDto } from "./dtos/sign-in.dto";
import type { SignUpDto } from "./dtos/sign-up.dto";
import { SignInCommand } from "./handlers/sign-in.handler";
import { SignOutCommand } from "./handlers/sign-out.handler";
import { SignUpCommand } from "./handlers/sign-up.handler";

@Injectable()
export class BasicAuthService {
    public constructor(private readonly commandBus: CommandBus) {}

    public async signUp(dto: SignUpDto) {
        return await this.commandBus.execute(new SignUpCommand(dto));
    }

    public async signIn(dto: SignInDto) {
        return await this.commandBus.execute(new SignInCommand(dto));
    }

    public async signOut(accessToken: string) {
        return await this.commandBus.execute(new SignOutCommand(accessToken));
    }
}
