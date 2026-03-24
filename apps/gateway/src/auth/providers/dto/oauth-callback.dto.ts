import type { Auth } from "@repo/common";
import { IsNotEmpty, IsString } from "class-validator";

export class OAuthCallbackDto implements Auth.OAuthCallbackDto {
    @IsNotEmpty({ message: "OAuth code should be provided" })
    @IsString({ message: "OAuth code should be string" })
    public code: string;
}
