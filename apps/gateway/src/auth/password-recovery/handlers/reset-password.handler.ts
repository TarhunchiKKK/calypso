import { BadRequestException, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";

export class ResetPasswordCommand extends Command<void> {
    public constructor(public email: string) {
        super();
    }
}

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler implements ICommandHandler<ResetPasswordCommand> {
    public constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(SupabaseService) private readonly supabaseService: SupabaseService
    ) {}

    public async execute({ email }: ResetPasswordCommand) {
        const { error } = await this.supabaseService.client.auth.resetPasswordForEmail(email, {
            redirectTo: `${this.configService.get("FRONTEND_URL")}/auth/password-recovery/reset`
        });

        if (error) {
            throw new BadRequestException(error.message);
        }
    }
}
