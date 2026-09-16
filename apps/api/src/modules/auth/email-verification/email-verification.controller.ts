import { Controller, HttpCode, HttpStatus, Inject, Param, Patch, Post } from "@nestjs/common";
import { Logging } from "src/infra/logs/decorators/logging.decorator";
import type { TokenPayload } from "../basic/lib/tokens.types";
import { Authorization } from "../basic/security/authorization.decorator";
import { Authorized } from "../basic/security/authorized.decorator";
import { EmailVerificationService } from "./email-verification.service";
import { EmailVerificationControllerApiTypes } from "./swagger/controller.swagger";

@Controller("email-verification")
@Authorization()
@Logging("http")
@EmailVerificationControllerApiTypes()
export class EmailVerificationController {
    public constructor(@Inject(EmailVerificationService) private readonly emailVerificationService: EmailVerificationService) {}

    @Post("send")
    @HttpCode(HttpStatus.OK)
    public async send(@Authorized() payload: TokenPayload) {
        return await this.emailVerificationService.send(payload.id);
    }

    @Patch("verify/:token")
    @HttpCode(HttpStatus.OK)
    public async verify(@Authorized() payload: TokenPayload, @Param("token") token: string) {
        return await this.emailVerificationService.verify(payload.id, token);
    }
}
