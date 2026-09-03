import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailsService } from "src/shared/mails";

export class SendMailCommandHandler {
    protected readonly baseUrl: string;

    public constructor(
        @Inject(MailsService) protected readonly mailsService: MailsService,
        @Inject(ConfigService) protected readonly configService: ConfigService
    ) {
        this.baseUrl = this.configService.getOrThrow("FRONTEND_URL");
    }
}
