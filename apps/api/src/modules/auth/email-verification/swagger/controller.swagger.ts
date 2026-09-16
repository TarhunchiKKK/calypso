import { HttpStatus } from "@nestjs/common";
import { createControllerSwaggerDecorator, EmptyApiType, SwaggerTags } from "src/shared/swagger";

export const EmailVerificationControllerApiTypes = createControllerSwaggerDecorator({
    tag: SwaggerTags.auth.children.emailVerification.name,
    auth: true,
    methods: [
        {
            name: "send",
            operation: {
                summary: "Send email with email verification link"
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
            name: "verify",
            operation: {
                summary: "Verifies email"
            },
            params: [
                {
                    name: "token",
                    type: String,
                    description: "Email verification token"
                }
            ],
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Email successfully verified",
                    type: EmptyApiType
                }
            ]
        }
    ]
});
