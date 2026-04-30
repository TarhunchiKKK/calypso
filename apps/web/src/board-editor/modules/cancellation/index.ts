import type { NodeBase } from "@repo/boards-common";
import type { NodesService } from "@/entities/nodes";
import { useCancellationStore } from "./use-cancellation-store.hook";

type CancellationModel = {
    service: NodesService;

    cancellation: {
        undo: () => void;

        redo: () => void;
    };
};

export function useCancellationDecorator(nodes: NodeBase[], service: NodesService): CancellationModel {
    const store = useCancellationStore();

    const createOne: NodesService["createOne"] = node => {
        store.push({
            undo: () => service.removeOne(node.id),
            redo: () => service.createOne(node)
        });

        service.createOne(node);
    };

    const createMany: NodesService["createMany"] = nodes => {
        const nodeIds = nodes.map(node => node.id);

        store.push({
            undo: () => service.removeMany(new Set(nodeIds)),
            redo: () => service.createMany(nodes)
        });

        service.createMany(nodes);
    };

    const updateOne: NodesService["updateOne"] = node => {
        const oldNode = service.findOne(node.id);

        store.push({
            undo: () => service.updateOne(oldNode),
            redo: () => service.updateOne(node)
        });

        service.updateOne(node);
    };

    const updateManyWithFn: NodesService["updateManyWithFn"] = (ids, fn) => {
        store.push({
            undo: () => service.replaceAll(nodes),
            redo: () => service.updateManyWithFn(ids, fn)
        });

        service.updateManyWithFn(ids, fn);
    };

    const removeOne: NodesService["removeOne"] = nodeId => {
        const oldNode = service.findOne(nodeId);

        store.push({
            undo: () => service.createOne(oldNode),
            redo: () => service.removeOne(nodeId)
        });

        service.removeOne(nodeId);
    };

    const removeMany: NodesService["removeMany"] = ids => {
        const oldNodes = nodes.filter(node => ids.has(node.id));

        store.push({
            undo: () => service.createMany(oldNodes),
            redo: () => service.removeMany(ids)
        });

        service.removeMany(ids);
    };

    const removeAll: NodesService["removeAll"] = () => {
        store.push({
            undo: () => service.replaceAll(nodes),
            redo: () => service.removeAll()
        });

        service.removeAll();
    };

    const replaceAll: NodesService["replaceAll"] = param => {
        store.push({
            undo: () => service.replaceAll(nodes),
            redo: () => service.replaceAll(param)
        });

        service.replaceAll(param);
    };

    return {
        service: {
            middleware: service.middleware,
            createOne,
            createMany,
            findOne: service.findOne,
            updateOne,
            updateManyWithFn,
            removeOne,
            removeMany,
            removeAll,
            replaceAll
        },
        cancellation: {
            undo: store.undo,
            redo: store.redo
        }
    };
}
