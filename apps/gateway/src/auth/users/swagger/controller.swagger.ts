import { createControllerSwaggerDecorator, EmptyApiType } from "@api/common";
import { HttpStatus } from "@nestjs/common";
import { SwaggerTags } from "src/lib/swagger/swagger.constants";
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
