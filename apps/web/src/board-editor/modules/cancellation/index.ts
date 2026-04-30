import type { NodeBase } from "@repo/boards-common";
import type { NodesService } from "@/entities/nodes";
import { useCancellationStore } from "./use-cancellation-store.hook";

export function useCancellationDecorator(nodes: NodeBase[], service: NodesService) {
    const store = useCancellationStore();

    const createOne: NodesService["createOne"] = node => {
        store.push({
            undo: () => service.removeOne(node.id),
            redo: () => createOne(node)
        });

        service.createOne(node);
    };

    const createMany: NodesService["createMany"] = nodes => {
        const nodeIds = nodes.map(node => node.id);

        store.push({
            undo: () => service.removeMany(new Set(nodeIds)),
            redo: () => createMany(nodes)
        });

        service.createMany(nodes);
    };

    const updateOne: NodesService["updateOne"] = node => {
        const oldNode = service.findOne(node.id);

        store.push({
            undo: () => service.updateOne(oldNode),
            redo: () => updateOne(node)
        });

        service.updateOne(node);
    };

    const updateManyWithFn: NodesService["updateManyWithFn"] = (ids, fn) => {
        store.push({
            undo: () => service.replaceAll(nodes),
            redo: () => updateManyWithFn(ids, fn)
        });

        service.updateManyWithFn(ids, fn);
    };

    const removeOne: NodesService["removeOne"] = nodeId => {
        const oldNode = service.findOne(nodeId);

        store.push({
            undo: () => service.createOne(oldNode),
            redo: () => removeOne(nodeId)
        });

        service.removeOne(nodeId);
    };

    const removeMany: NodesService["removeMany"] = ids => {
        const oldNodes = nodes.filter(node => ids.has(node.id));

        store.push({
            undo: () => service.createMany(oldNodes),
            redo: () => removeMany(ids)
        });

        service.removeMany(ids);
    };

    const removeAll: NodesService["removeAll"] = () => {
        store.push({
            undo: () => service.replaceAll(nodes),
            redo: () => removeAll()
        });

        service.removeAll();
    };

    const replaceAll: NodesService["replaceAll"] = param => {
        store.push({
            undo: () => service.replaceAll(nodes),
            redo: () => replaceAll(param)
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
        } satisfies NodesService,
        cancellation: {
            undo: store.undo,
            redo: store.redo
        }
    };
}
