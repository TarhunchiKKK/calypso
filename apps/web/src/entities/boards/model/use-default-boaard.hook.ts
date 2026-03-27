import type { Boards } from "@repo/common";
import { useState } from "react";

function getBoard() {
    const storedBoard = localStorage.getItem(import.meta.env.VITE_BOARD_LS_KEY);

    if (storedBoard) {
        return JSON.parse(storedBoard) as Boards.Board;
    }

    const board: Boards.Board = {
        id: crypto.randomUUID(),
        title: "New board",
        createdAt: new Date(),
        creatorId: "creator"
    };

    localStorage.setItem(import.meta.env.VITE_BOARD_LS_KEY, JSON.stringify(board));

    return board;
}

export function useDefaultBoard() {
    const [board] = useState<Boards.Board>(() => getBoard());

    return { board };
}
