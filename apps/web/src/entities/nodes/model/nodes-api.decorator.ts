import type { Id } from "@repo/common";
import { NodesApi } from "./nodes.api";
import type { NodesService } from "./use-nodes-service.hook";

export function useNodesApiDecorator(service: NodesService, boardId: Id): NodesService {
    const { mutate: createNodes } = NodesApi.useCreateMany();
    const { mutate: updateNodes } = NodesApi.useUpdateMany();
    const { mutate: removeNodes } = NodesApi.useRemoveMany();

    const createOne: NodesService["createOne"] = (node) => {
        service.createOne(node);

        createNodes({
            nodes: [node],
            boardId: boardId
        });
    };

    const createMany: NodesService["createMany"] = (nodes) => {
        service.createMany(nodes);

        createNodes({
            nodes: nodes,
            boardId: boardId
        });
    };

    const updateOne: NodesService["updateOne"] = (node) => {
        service.updateOne(node);

        updateNodes({
            nodes: [node],
            boardId: boardId
        });
    };

    const updateMany: NodesService["updateMany"] = (newNodes) => {
        service.updateMany(newNodes);

        updateNodes({
            nodes: newNodes,
            boardId: boardId
        });
    };

    const updateManyWithFn: NodesService["updateManyWithFn"] = (nodeIds, fn) => {
        service.updateManyWithFn(nodeIds, fn);

        const updatedNodes = service.nodes.filter((node) => nodeIds.has(node.id)).map(fn);
        updateNodes({
            nodes: updatedNodes,
            boardId: boardId
        });
    };

    const removeOne: NodesService["removeOne"] = (nodeId) => {
        service.removeOne(nodeId);

        removeNodes({
            ids: [nodeId],
            boardId: boardId
        });
    };

    const removeMany: NodesService["removeMany"] = (nodeIds) => {
        service.removeMany(nodeIds);

        removeNodes({
            ids: Array.from(nodeIds),
            boardId: boardId
        });
    };

    const removeAll: NodesService["removeAll"] = () => {
        service.removeAll();

        // OPTIMIZE: create `clearBoard` endpoint
        removeNodes({
            ids: service.nodes.map((node) => node.id),
            boardId: boardId
        });
    };

    return {
        nodes: service.nodes,
        middleware: service.middleware,
        mappers: service.mappers,
        createOne: createOne,
        createMany: createMany,
        findOne: service.findOne,
        updateOne: updateOne,
        updateMany: updateMany,
        updateManyWithFn: updateManyWithFn,
        removeOne: removeOne,
        removeMany: removeMany,
        removeAll: removeAll,
        replaceAll: service.replaceAll
    };
}
