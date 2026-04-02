import type { OAuthCallbackDto as AuthCallbackDtoType } from "@repo/common";
import { IsNotEmpty, IsString } from "class-validator";

export class OAuthCallbackDto implements AuthCallbackDtoType {
    @IsNotEmpty({ message: "OAuth code should be provided" })
    @IsString({ message: "OAuth code should be string" })
    public code: string;
}
