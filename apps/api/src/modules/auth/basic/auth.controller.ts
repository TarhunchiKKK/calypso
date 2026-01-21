import { Controller } from "@nestjs/common";
import type { AuthService } from "./auth.service";

@Controller("basic")
export class AuthController {
    constructor(private readonly authService: AuthService) {}
}
