import type { ApiBodyOptions, ApiOperationOptions, ApiParamOptions, ApiQueryOptions, ApiResponseOptions } from "@nestjs/swagger";

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
    tag: string;

    auth?: boolean;

    methods: ControllerMethodSwaggerOptions[];
};
