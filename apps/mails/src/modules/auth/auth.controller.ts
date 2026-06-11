import { Controller, Inject } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    public constructor(@Inject(AuthService) private readonly authService: AuthService) {}
}
