import { Controller, Param, Patch, Post } from "@nestjs/common";
import { Authorization } from "../lib/tokens/security/authorization.decorator";
import { Authorized } from "../lib/tokens/security/authorized.decorator";
import type { TokenPayload } from "../lib/tokens/types";
import type { EmailVerificationService } from "./email-verification.service";

@Controller("email-verification")
@Authorization()
export class EmailVerificationController {
    public constructor(private readonly emailVerificationService: EmailVerificationService) {}

    @Post("send")
    public async send(@Authorized() payload: TokenPayload) {
        return await this.emailVerificationService.send(payload.id);
    }

    @Patch(":token")
    public async verify(@Authorized() payload: TokenPayload, @Param("token") token: string) {
        return await this.emailVerificationService.verify(payload.id, token);
    }
}
