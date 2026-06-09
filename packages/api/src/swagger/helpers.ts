import { ApiCookieAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import type { ControllerMethodSwaggerOptions, ControllerSwaggerOptions } from "./types";

export function applyMethodSwaggerInfo(constructorFn: Function, method: ControllerMethodSwaggerOptions) {
    const descriptor = Reflect.getOwnPropertyDescriptor(constructorFn.prototype, method.name);

    if (!descriptor) {
        throw new Error(`Descriptor for property ${method.name} not found.`);
    }

    if (method.operation) {
        ApiOperation(method.operation)(constructorFn.prototype[method.name], method.name, descriptor);
    }

    if (method.body) {
        ApiQuery(method.body)(constructorFn.prototype[method.name], method.name, descriptor);
    }

    if (method.query) {
        ApiQuery(method.query)(constructorFn.prototype[method.name], method.name, descriptor);
    }

    if (method.response) {
        method.response.forEach((response) => {
            ApiOperation(response)(constructorFn.prototype[method.name], method.name, descriptor);
        });
    }

    if (method.auth) {
        ApiCookieAuth()(constructorFn.prototype[method.name], method.name, descriptor);
    }

    if (method.params) {
        method.params.forEach((param) => {
            ApiParam(param)(constructorFn.prototype[method.name], method.name, descriptor);
        });
    }
}

export function createControllerSwaggerDecorator(options: ControllerSwaggerOptions) {
    return () => {
        return (constructorFn: Function) => {
            ApiTags(options.tag)(constructorFn);

            if (options.auth) {
                ApiCookieAuth()(constructorFn);
            }

            options.methods.forEach((method) => {
                applyMethodSwaggerInfo(constructorFn, method);
            });
        };
    };
}
