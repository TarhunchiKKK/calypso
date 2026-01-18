export const DefaultNodePayloadsMap = {
    sticker: {
        type: "sticker" as const,
        blocked: false,
        rect: {
            width: 100,
            height: 100
        },
        text: "Hello"
    },
    text: {
        type: "text" as const,
        blocked: false,
        rect: {
            width: 100,
            height: 100
        },
        text: []
    }
};
