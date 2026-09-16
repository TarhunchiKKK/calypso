import type { Board } from "@lib/boards";

export const MockBoard: Board = {
    id: crypto.randomUUID(),
    title: "Board",
    description: "Board description",
    icon: "",
    creatorId: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date()
};
