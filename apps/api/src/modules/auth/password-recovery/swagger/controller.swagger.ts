import { HttpStatus } from "@nestjs/common";
import { createControllerSwaggerDecorator, EmptyApiType, SwaggerTags } from "src/shared/swagger";
import { UpdatePasswordDtoApiType } from "./dto.swagger";

export const PasswordRecoveryControllerApiType = createControllerSwaggerDecorator({
    tag: SwaggerTags.auth.children.passwordRecovery.name,
    auth: true,
    methods: [
        {
            name: "reset",
            operation: {
                summary: "Send email with password recovery link"
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Email successfully sended",
                    type: EmptyApiType
                }
            ]
        },
        {
            name: "update",
            operation: {
                summary: "Update user password"
            },
            params: [
                {
                    name: "token",
                    type: String,
                    description: "Password recovery token"
                }
            ],
            body: {
                type: UpdatePasswordDtoApiType
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Password successfully updated",
                    type: EmptyApiType
                }
            ]
        }
    ]
});
