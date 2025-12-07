export type NodeTypes = "sticker" | "arrow" | "notes";

export type NodeBase = {
    id: string;

    type: NodeTypes;
};
