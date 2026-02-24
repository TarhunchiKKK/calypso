import type { HotKey } from "@/shared/lib/hot-keys";

export const BoardEditorHotKeys: Record<string, HotKey | HotKey[]> = {
    copySelectedNodes: {
        key: "c",
        shiftKey: false,
        ctrlKey: true
    },
    pasteSelectedNodes: {
        key: "v",
        shiftKey: false,
        ctrlKey: true
    },
    cutSelectedNodes: {
        key: "x",
        shiftKey: false,
        ctrlKey: true
    },
    selectAllNodes: {
        key: "a",
        shiftKey: false,
        ctrlKey: true
    },
    lockSelectedNodes: {
        key: "l",
        shiftKey: false,
        ctrlKey: true
    },
    unlockSelectedNodes: {
        key: "l",
        shiftKey: true,
        ctrlKey: true
    },
    removeSelectedNodes: [
        {
            key: "Delete",
            shiftKey: false,
            ctrlKey: false
        },
        {
            key: "Backspace",
            shiftKey: false,
            ctrlKey: false
        }
    ],
    switchToIdle: [
        {
            key: "Escape",
            shiftKey: false,
            ctrlKey: false
        },
        {
            key: "i",
            shiftKey: false,
            ctrlKey: false
        }
    ],
    switchToStickersCreation: {
        key: "s",
        shiftKey: false,
        ctrlKey: false
    }
};
