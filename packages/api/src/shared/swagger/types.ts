import type { ApiBodyOptions, ApiOperationOptions, ApiParamOptions, ApiQueryOptions, ApiResponseOptions, ApiTagOptions } from "@nestjs/swagger";

export type ControllerMethodSwaggerOptions = {
    name: string;

    operation?: ApiOperationOptions;

    body?: ApiBodyOptions;

    query?: ApiQueryOptions;

    response?: ApiResponseOptions[];

    params?: ApiParamOptions[];

    auth?: boolean;
};

export type ControllerSwaggerOptions = {
    tags?: ApiTagOptions;

    auth?: boolean;

    methods: ControllerMethodSwaggerOptions[];
};
