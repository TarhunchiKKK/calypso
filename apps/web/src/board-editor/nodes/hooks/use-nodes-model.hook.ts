import type { NodeBase } from "@repo/boards";
import type { Id, OmitFields } from "@repo/common";
import { useExchangeBuffer } from "@/board-editor/modules/exchange-buffer";
import { type NodesService, useNodesService } from "@/entities/nodes";
import { useCancellationDecorator } from "./use-cancellation-decorator.hook";

export function useNodesModel(inputNodes: NodeBase[], _: Id) {
    const nodesService = useNodesService(inputNodes);

    // TEMP: implement
    // const _ = useNodesApiDecorator(nodesService, boardId);

    const withCancellation = useCancellationDecorator(nodesService);

    const exchangeBuffer = useExchangeBuffer(withCancellation.service);

    return {
        nodes: withCancellation.service.nodes,

        // WARN: `replaceAll` method should not be used in view model (this method is not handled by nodes api and cancellation decorators)
        service: withCancellation.service as OmitFields<NodesService, "replaceAll">,
        exchangeBuffer: exchangeBuffer,
        cancellation: withCancellation.cancellation
    };
}

export type NodesModel = ReturnType<typeof useNodesModel>;
