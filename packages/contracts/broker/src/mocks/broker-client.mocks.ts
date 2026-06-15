import { mock } from "bun:test";
import type { ClientProxy } from "@nestjs/microservices";

export function createBrokerClientMock() {
    return {
        send: mock<ClientProxy["send"]>((() => {}) as any),
        emit: mock<ClientProxy["emit"]>((() => {}) as any)
    } satisfies Partial<Record<keyof ClientProxy, unknown>>;
}
