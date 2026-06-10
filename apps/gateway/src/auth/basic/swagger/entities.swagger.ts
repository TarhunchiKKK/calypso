import { ApiProperty } from "@nestjs/swagger";
import type { User } from "src/auth/users/entities/user.entity";

export class UserApiType implements User {
    @ApiProperty({ type: String, format: "uuid", description: "Unique user id" })
    public id: string;

    @ApiProperty({ type: String, format: "email", description: "User email" })
    public email: string;

    @ApiProperty({ type: Boolean, description: "User email verified flag" })
    public emailVerified: boolean;

    @ApiProperty({ type: String, description: "user display name" })
    public username: string;

    @ApiProperty({ type: String, format: "password", description: "User password" })
    public password: string;

    @ApiProperty({ type: String, format: "uri", description: "User avatar url" })
    public avatar?: string;
}
