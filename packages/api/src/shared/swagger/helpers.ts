import { ApiCookieAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import type { ControllerMethodSwaggerOptions, ControllerSwaggerOptions } from "./types";

export function applyMethodSwaggerInfo<Controller extends Record<string, unknown>>(
    constructorFn: Function,
    method: ControllerMethodSwaggerOptions<Controller>
) {
    const descriptor = Reflect.getOwnPropertyDescriptor(constructorFn.prototype, method.name);

    if (!descriptor) {
        throw new Error(`Descriptor for property ${method.name} not found.`);
    }

    if (method.operation) {
        ApiOperation(method.operation)(constructorFn.prototype[method.name], method.name, descriptor);
    }

    if (method.response) {
        ApiOperation(method.response)(constructorFn.prototype[method.name], method.name, descriptor);
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

export function createControllerSwaggerDecorator<Controller extends Record<string, unknown>>(options: ControllerSwaggerOptions<Controller>) {
    return (constructorFn: Function) => {
        if (options.tags) {
            ApiTags(options.tags)(constructorFn);
        }

        if (options.auth) {
            ApiCookieAuth()(constructorFn);
        }

        options.methods.forEach((method) => {
            applyMethodSwaggerInfo(constructorFn, method);
        });
    };
}
