import { Controller } from "@nestjs/common";
import { Authorization } from "../lib/tokens/security/authorization.decorator";
import type { PasswordRecoveryService } from "./password-recovery.service";

@Controller("password-recovery")
@Authorization()
export class PasswordRecoveryController {
    public constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}
}
