import { BadRequestException, Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { AuthResponse } from "@repo/common";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";
import type { SignUpDto } from "../dto/sign-up.dto";

export class SignUpCommand extends Command<AuthResponse> {
    public constructor(public dto: SignUpDto) {
        super();
    }
}

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
    public constructor(@Inject(SupabaseService) private readonly supabaseService: SupabaseService) {}

    public async execute({ dto }: SignUpCommand) {
        const { data, error } = await this.supabaseService.client.auth.signUp({
            email: dto.email,
            password: dto.password,
            options: {
                data: dto.metadata
            }
        });

        if (error) {
            throw new BadRequestException(error.message);
        }

        return this.supabaseService.mapAuthResponse(data);
    }
}
