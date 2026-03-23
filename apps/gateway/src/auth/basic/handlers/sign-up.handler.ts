import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";
import type { SignUpDto } from "../dtos/sign-up.dto";

export class SignUpCommand implements ICommand {
    public constructor(public dto: SignUpDto) {}
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

        return {
            user: data.user,
            session: data.session
        };
    }
}
