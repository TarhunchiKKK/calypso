import { Controller } from "@nestjs/common";
import type { AuthService } from "./auth.service";
import { Authorization } from "./decorators/authorization.decorator";
import { Authorized } from "./decorators/authorized.decorator";
import type { SignInRequest } from "./dto/sign-in.dto";
import type { SignUpRequest } from "./dto/sign-up.dto";

@Controller("basic")
export class AuthController {
    public constructor(private readonly authService: AuthService) {}

    public async signUp(request: SignUpRequest) {
        return await this.authService.signUp(request);
    }

    public async signIn(request: SignInRequest) {
        return await this.authService.signIn(request);
    }

    @Authorization()
    public async findOne(@Authorized("username") username: string) {
        return await this.authService.findOne(username);
    }

    @Authorization()
    public async removeOne(@Authorized("username") username: string) {
        return await this.authService.removeOne(username);
    }
}
