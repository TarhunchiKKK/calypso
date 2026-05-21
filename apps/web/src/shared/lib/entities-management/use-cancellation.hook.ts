import { useState } from "react";

type Callback = () => void;

type UndoItem = {
    undo: Callback;

    redo: Callback;
};

type RedoItem = Callback;

export function useCancellation() {
    const [undoQueue, setUndoQueue] = useState<UndoItem[]>([]);
    const [redoQueue, setRedoQueue] = useState<RedoItem[]>([]);

    const push = (item: UndoItem) => {
        setUndoQueue((prev) => [...prev, item]);
    };

    const undo = () => {
        if (undoQueue.length === 0) {
            return;
        }

        const lastUndoItem = undoQueue[undoQueue.length - 1];

        setUndoQueue((prev) => prev.slice(0, prev.length - 1));
        setRedoQueue((prev) => [...prev, lastUndoItem.redo]);

        lastUndoItem.undo();
    };

    const redo = () => {
        if (redoQueue.length === 0) {
            return;
        }

        const lastRedoItem = redoQueue[redoQueue.length - 1];

        setRedoQueue((prev) => prev.slice(0, redoQueue.length - 1));

        lastRedoItem();
    };

    return {
        push,
        undo,
        redo,
        sizes: {
            undo: undoQueue.length,
            redo: redoQueue.length
        }
    };
}
