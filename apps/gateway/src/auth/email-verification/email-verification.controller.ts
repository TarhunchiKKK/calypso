import { Controller } from "@nestjs/common";
import type { EmailVerificationService } from "./email-verification.service";

@Controller("email-verification")
export class EmailVerificationController {
    public constructor(private readonly emailVerificationService: EmailVerificationService) {}
}
