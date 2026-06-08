import type { ApiOperationOptions, ApiResponseOptions } from "@nestjs/swagger";

export type ControllerMethodSwaggerInfo = {
    name: string;

    operation?: ApiOperationOptions;

    response?: ApiResponseOptions;

    auth?: boolean;
};
