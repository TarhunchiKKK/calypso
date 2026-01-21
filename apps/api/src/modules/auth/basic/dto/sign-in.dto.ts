import type { SignInDto } from "@repo/common";

export class SignInDtoImpl implements SignInDto {
    public username: string;

    public password: string;
}
