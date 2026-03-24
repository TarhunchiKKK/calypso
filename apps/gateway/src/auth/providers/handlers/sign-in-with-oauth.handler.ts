import { BadRequestException, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { Auth } from "@repo/common";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";

export class SignInWithOAuthCommand extends Command<string> {
    public constructor(public provider: Auth.OAuthProviders) {
        super();
    }
}

@CommandHandler(SignInWithOAuthCommand)
export class SignInWithOAuthCommandHandler implements ICommandHandler<SignInWithOAuthCommand> {
    public constructor(
        @Inject(SupabaseService) private readonly supabaseService: SupabaseService,
        @Inject(ConfigService) private readonly configService: ConfigService
    ) {}

    public async execute({ provider }: SignInWithOAuthCommand) {
        const { data, error } = await this.supabaseService.client.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: this.configService.getOrThrow("FRONTEND_URL")
            }
        });

        if (error) {
            throw new BadRequestException(error.message);
        }

        return data.url;
    }
}
