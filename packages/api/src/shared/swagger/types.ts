import type { ApiOperationOptions, ApiParamOptions, ApiResponseOptions, ApiTagOptions } from "@nestjs/swagger";

export type ControllerMethodSwaggerOptions<Controller extends Record<string, unknown>> = {
    name: Exclude<keyof Controller, number | symbol>;

    operation?: ApiOperationOptions;

    response?: ApiResponseOptions;

    params?: ApiParamOptions[];

    auth?: boolean;
};

export type ControllerSwaggerOptions<Controller extends Record<string, unknown>> = {
    tags?: ApiTagOptions;

    auth?: boolean;

    methods: ControllerMethodSwaggerOptions<Controller>[];
};
