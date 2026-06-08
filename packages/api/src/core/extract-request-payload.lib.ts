import { ExecutionContext } from "@nestjs/common";

export function extractContextPayload<T = any>(context: ExecutionContext): T {
    const type = context.getType();

    switch (type) {
        case "http":
            return context.switchToHttp().getRequest();
        case "rpc":
            return context.switchToRpc().getData();
        case "ws":
            throw new Error("'ws' context not supported");
        default:
            throw new Error(`Unknown context type: ${type}`);
    }
}
