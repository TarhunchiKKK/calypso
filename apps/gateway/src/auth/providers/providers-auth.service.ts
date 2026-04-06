import { Inject, Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import type { OAuthCallbackDto, OAuthProviders } from "@repo/common";
import { OAuthCallbackCommand } from "./handlers/oauth-callback.handler";
import { SignInWithOAuthCommand } from "./handlers/sign-in-with-oauth.handler";

@Injectable()
export class ProvidersAuthService {
    public constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

    public async signIn(provider: OAuthProviders) {
        return await this.commandBus.execute(new SignInWithOAuthCommand(provider));
    }

    public async callback(dto: OAuthCallbackDto) {
        return await this.commandBus.execute(new OAuthCallbackCommand(dto));
    }
}
