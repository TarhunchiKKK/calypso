import { BadRequestException, Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";

export class SignOutCommand extends Command<void> {
    public constructor(public accessToken: string) {
        super();
    }
}

@CommandHandler(SignOutCommand)
export class SignOutCommandHandler implements ICommandHandler<SignOutCommand> {
    public constructor(@Inject(SupabaseService) private readonly supabaseService: SupabaseService) {}

    public async execute({ accessToken }: SignOutCommand) {
        const { error } = await this.supabaseService.client.auth.admin.signOut(accessToken);

        if (error) {
            throw new BadRequestException(error.message);
        }
    }
}
