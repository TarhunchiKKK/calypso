import { Inject, UnauthorizedException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { Auth } from "@repo/common";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";

export class GetProfileCommand extends Command<Auth.User> {
    public constructor(public accessToken: string) {
        super();
    }
}

@CommandHandler(GetProfileCommand)
export class GetProfileCommandHandler implements ICommandHandler<GetProfileCommand> {
    public constructor(@Inject(SupabaseService) private readonly supabaseService: SupabaseService) {}

    public async execute({ accessToken }: GetProfileCommand) {
        const { data, error } = await this.supabaseService.client.auth.getUser(accessToken);

        if (error) {
            throw new UnauthorizedException("Invalid token");
        }

        return this.supabaseService.mapUser(data.user);
    }
}
