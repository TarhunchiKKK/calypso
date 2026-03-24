import { BadRequestException, Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { Auth } from "@repo/common";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";
import type { SignInDto } from "../dtos/sign-in.dto";

export class SignInCommand extends Command<Auth.AuthResponse> {
    public constructor(public dto: SignInDto) {
        super();
    }
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

        return this.supabaseService.mapAuthResponse(data);
    }
}
