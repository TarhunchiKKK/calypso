import { BadRequestException, Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";
import type { ChangePasswordDto } from "../dto/change-password.dto";

export class ChangePasswordCommand extends Command<void> {
    public constructor(public dto: ChangePasswordDto & { userId: string }) {
        super();
    }
}

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler implements ICommandHandler<ChangePasswordCommand> {
    public constructor(@Inject(SupabaseService) private readonly supabaseService: SupabaseService) {}

    public async execute({ dto }: ChangePasswordCommand) {
        const { error } = await this.supabaseService.client.auth.admin.updateUserById(dto.userId, {
            password: dto.newPassword
        });

        if (error) {
            throw new BadRequestException(error.message);
        }
    }
}
