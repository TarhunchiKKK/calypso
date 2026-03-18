import { Inject, Injectable } from "@nestjs/common";
import type { ClientProxy } from "@nestjs/microservices";
import { RmqRoutingKeys } from "@repo/api";
import type { Boards } from "@repo/common";
import { BOARDS_RMQ_CLIENT_INJECTION_TOKEN } from "../lib/rmq.constants";

@Injectable()
export class NodesRmqService {
    public constructor(@Inject(BOARDS_RMQ_CLIENT_INJECTION_TOKEN) private readonly client: ClientProxy) {}

    public createMany(nodes: Boards.NodeBase[]) {
        this.client.emit(RmqRoutingKeys.boards.nodes.createMany, { data: nodes });
    }

    public updateMany(nodes: Boards.NodeBase[]) {
        this.client.emit(RmqRoutingKeys.boards.nodes.updateMany, { data: nodes });
    }

    public removeMany(ids: string[]) {
        this.client.emit(RmqRoutingKeys.boards.nodes.removeMany, { ids });
    }
}
