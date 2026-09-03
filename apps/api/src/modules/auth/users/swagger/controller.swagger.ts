import { HttpStatus } from "@nestjs/common";
import { createControllerSwaggerDecorator, EmptyApiType, SwaggerTags } from "src/shared/swagger";
import { UpdateProfileDtoApiType } from "./dto.swagger";

export const UsersControllerApiType = createControllerSwaggerDecorator({
    tag: SwaggerTags.auth.children.users.name,
    auth: true,
    methods: [
        {
            name: "update",
            operation: {
                summary: "Update user profile"
            },
            body: {
                type: UpdateProfileDtoApiType
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Profile successfully updated",
                    type: EmptyApiType
                }
            ]
        }
    ]
});
