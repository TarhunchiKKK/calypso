import { mock } from "bun:test";
import type { WithMockedMethods } from "@api/common";
import type { ClientProxy } from "@nestjs/microservices";
import { of } from "rxjs";

export function createBrokerClientMock() {
    return {
        send: mock(() => of([])),
        emit: mock(() => of([]))
    } satisfies Partial<WithMockedMethods<ClientProxy>>;
}
