import type { ControllerMethodSwaggerInfo } from "@api/common";

export function BoardsControllerApiTypes() {
    return (constructor: Function) => {
        const methods: ControllerMethodSwaggerInfo[] = [
            {
                name: "create",
                operation: { summary: "Create new board" },
                response: {},
                auth: true
            },
            {
                name: "update",
                operation: { summary: "Updates board" }
            }
        ];
    };
}
