import { Controller, Delete, Get, Post, UsePipes } from "@nestjs/common";
import { AuthDto } from "@repo/common";
import { ZodValidationPipe } from "src/shared/validation";
import type { AuthService } from "./auth.service";
import { Authorization } from "./decorators/authorization.decorator";
import { Authorized } from "./decorators/authorized.decorator";
import type { SignInRequest } from "./dto/sign-in.dto";
import type { SignUpRequest } from "./dto/sign-up.dto";

@Controller("auth")
export class AuthController {
    public constructor(private readonly authService: AuthService) {}

    @Post("sign-up")
    @UsePipes(new ZodValidationPipe(AuthDto))
    public async signUp(request: SignUpRequest) {
        return await this.authService.signUp(request);
    }

    @Post("sign-in")
    @UsePipes(new ZodValidationPipe(AuthDto))
    public async signIn(request: SignInRequest) {
        return await this.authService.signIn(request);
    }

    @Get()
    @Authorization()
    public async findOne(@Authorized("username") username: string) {
        return await this.authService.findOne(username);
    }

    @Delete()
    @Authorization()
    public async removeOne(@Authorized("username") username: string) {
        return await this.authService.removeOne(username);
    }
}
