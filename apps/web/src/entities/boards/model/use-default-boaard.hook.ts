import type { Board } from "@repo/boards-common";
import { useState } from "react";

function getBoard() {
    const storedBoard = localStorage.getItem(import.meta.env.VITE_BOARD_LS_KEY);

    if (storedBoard) {
        return JSON.parse(storedBoard) as Board;
    }

    const board: Board = {
        id: crypto.randomUUID(),
        title: "New board",
        createdAt: new Date(),
        creatorId: "creator"
    };

    localStorage.setItem(import.meta.env.VITE_BOARD_LS_KEY, JSON.stringify(board));

    return board;
}

export function useDefaultBoard() {
    const [board] = useState<Board>(() => getBoard());

    return { board };
}
