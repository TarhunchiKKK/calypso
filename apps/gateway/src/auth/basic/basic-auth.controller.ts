import { Body, Controller, Post } from "@nestjs/common";
import { Validation } from "@repo/api";
import type { BasicAuthService } from "./basic-auth.service";
import type { SignInDto } from "./dtos/sign-in.dto";
import type { SignUpDto } from "./dtos/sign-up.dto";

@Controller("basic-auth")
export class BasicAuthController {
    public constructor(private readonly basicAuthService: BasicAuthService) {}

    @Post("sign-up")
    @Validation()
    public async signUp(@Body() dto: SignUpDto) {
        return await this.basicAuthService.signUp(dto);
    }

    @Post("sign-in")
    @Validation()
    public async signIn(@Body() dto: SignInDto) {
        return await this.basicAuthService.signIn(dto);
    }

    @Post("sign-out")
    public async signOut(accessToken: string) {
        return await this.basicAuthService.signOut(accessToken);
    }
}
