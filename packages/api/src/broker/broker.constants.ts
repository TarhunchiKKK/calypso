export const BrokerRoutingKeys = {
    boards: {
        nodes: {
            createMany: "boards.nodes.create-many",
            updateMany: "boards.nodes.update-many",
            removeMany: "boards.nodes.remove-many"
        },
        events: {
            nodesChanged: "boards.nodes.changed",
            boardRemoved: "boards.board.removed"
        }
    }
};

// FIX: move to `rmq.config.ts`
export const CommonBrokerOptions = {
    queueOptions: {
        durable: true
    },
    noAck: false,
    prefetchCount: 1,
    persistent: true
};
