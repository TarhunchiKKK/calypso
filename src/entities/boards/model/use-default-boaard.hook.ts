import { useState } from "react";
import type { Board } from "../types/board.types";

function getBoard() {
    const storedBoard = localStorage.getItem(import.meta.env.VITE_BOARD_LS_KEY);

    if (storedBoard) {
        return JSON.parse(storedBoard) as Board;
    }

    const board = {
        id: crypto.randomUUID(),
        title: "New board"
    };

    localStorage.setItem(import.meta.env.VITE_BOARD_LS_KEY, JSON.stringify(board));

    return board;
}

export function useDefaultBoard() {
    const [board] = useState<Board>(() => getBoard());

    return { board };
}
