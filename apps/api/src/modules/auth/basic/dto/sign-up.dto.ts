import type { SignUpDto } from "@repo/common";

export class SignUpDtoImpl implements SignUpDto {
    public username: string;

    public password: string;
}
