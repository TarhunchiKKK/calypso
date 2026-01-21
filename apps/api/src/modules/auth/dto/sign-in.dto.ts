import type { SignInDto } from "@repo/common";

export class SignInRequest implements SignInDto {
    public username: string;

    public password: string;
}
