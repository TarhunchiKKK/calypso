import { createControllerSwaggerDecorator, EmptyApiType } from "@api/common";
import { HttpStatus } from "@nestjs/common";
import { SwaggerTags } from "src/lib/swagger/swagger.constants";
import { ProfileApiType, SignInDtoApiType, SignUpDtoApiType } from "./dtos.swagger";

export const BasicAuthControllerApiType = createControllerSwaggerDecorator({
    tag: SwaggerTags.auth.children.basic.name,
    methods: [
        {
            name: "signUp",
            auth: false,
            operation: {
                summary: "Create new user"
            },
            body: {
                type: SignUpDtoApiType
            },
            response: [
                {
                    status: HttpStatus.CREATED,
                    description: "User successfully created",
                    type: ProfileApiType
                }
            ]
        },
        {
            name: "signIn",
            auth: false,
            operation: {
                summary: "Login user"
            },
            body: {
                type: SignInDtoApiType
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "User successfully logged in",
                    type: ProfileApiType
                }
            ]
        },
        {
            name: "signOut",
            auth: true,
            operation: {
                summary: "Logs user out"
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "User successfully logged out",
                    type: EmptyApiType
                }
            ]
        },
        {
            name: "getProfile",
            auth: true,
            operation: {
                summary: "Retrieves profile info"
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Profile successfully retrieved",
                    type: ProfileApiType
                }
            ]
        },
        {
            name: "refreshSession",
            auth: true,
            operation: {
                summary: "Refreshes session"
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Session successfully refreshed",
                    type: ProfileApiType
                }
            ]
        }
    ]
});
