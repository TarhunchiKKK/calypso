import { Inject, UnauthorizedException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { AuthResponse, OAuthCallbackDto } from "@repo/common";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";

export class OAuthCallbackCommand extends Command<AuthResponse> {
    public constructor(public dto: OAuthCallbackDto) {
        super();
    }
}

@CommandHandler(OAuthCallbackCommand)
export class OAuthCallbackCommandHandler implements ICommandHandler<OAuthCallbackCommand> {
    public constructor(@Inject(SupabaseService) private readonly supabaseService: SupabaseService) {}

    public async execute({ dto }: OAuthCallbackCommand) {
        const { data, error } = await this.supabaseService.client.auth.exchangeCodeForSession(dto.code);

        if (error) {
            throw new UnauthorizedException(error.message);
        }

        return this.supabaseService.mapAuthResponse(data);
    }
}
