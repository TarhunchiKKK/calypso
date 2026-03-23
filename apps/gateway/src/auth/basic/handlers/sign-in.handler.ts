import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";
import type { SignInDto } from "../dtos/sign-in.dto";

export class SignInCommand implements ICommand {
    public constructor(public dto: SignInDto) {}
}

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
    public constructor(@Inject(SupabaseService) private readonly supabaseService: SupabaseService) {}

    public async execute({ dto }: SignInCommand) {
        const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
            email: dto.email,
            password: dto.email
        });

        if (error) {
            throw new BadRequestException(error.message);
        }

        return {
            user: data.user,
            session: data.session
        };
    }
}
