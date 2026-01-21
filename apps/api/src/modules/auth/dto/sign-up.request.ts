import type { SignUpDto } from "@repo/common";

export class SignUpRequest implements SignUpDto {
    public username: string;

    public password: string;
}
