import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthDto } from "@repo/common";
import { ApiConflict, ApiNotFound, ApiUnauthorized } from "src/shared/swagger";
import { Validation } from "src/shared/validation";
import type { AuthService } from "./auth.service";
import { Authorization } from "./decorators/authorization.decorator";
import { Authorized } from "./decorators/authorized.decorator";
import { SignInDto, SignInResponse } from "./dto/sign-in.dto";
import { SignUpDto, SignUpResponse } from "./dto/sign-up.dto";
import { AccountApiType } from "./swagger/account.api-type";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    public constructor(private readonly authService: AuthService) {}

    @Post("sign-up")
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ description: "User sign up data", type: SignUpDto })
    @ApiCreatedResponse({ description: "Successful sign up", type: SignUpResponse })
    @ApiConflict("User with such username already exists")
    @Validation(AuthDto)
    public async signUp(@Body() dto: SignUpDto) {
        return await this.authService.signUp(dto);
    }

    @Post("sign-in")
    @HttpCode(HttpStatus.OK)
    @ApiBody({ description: "User sign in data", type: SignInDto })
    @ApiOkResponse({ description: "Successful sign in", type: SignInResponse })
    @ApiNotFound("Account not found")
    @ApiUnauthorized("PAsswords not match")
    @Validation(AuthDto)
    public async signIn(@Body() dto: SignInDto) {
        return await this.authService.signIn(dto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: "Account founded", type: AccountApiType })
    @ApiNotFound("Account not found")
    @Authorization()
    public async findOne(@Authorized("username") username: string) {
        return await this.authService.findOne(username);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    @Authorization()
    public async removeOne(@Authorized("username") username: string) {
        return await this.authService.removeOne(username);
    }
}
