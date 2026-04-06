import { BadRequestException, Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { ChangePasswordDto } from "@repo/common";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";

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
            password: dto.password
        });

        if (error) {
            throw new BadRequestException(error.message);
        }
    }
}
