import type { HotKeysMap } from "@/shared/lib/hot-keys";

export const BoardHotKeys = {
    switch: {
        toIdle: [
            {
                key: "i",
                shiftKey: false,
                ctrlKey: false
            },
            {
                key: "Escape",
                shiftKey: false,
                ctrlKey: false
            }
        ],
        toCreation: {
            sticker: {
                key: "s",
                shiftKey: false,
                ctrlKey: false
            },
            arrow: {
                key: "a",
                shiftKey: false,
                ctrlKey: false
            },
            text: {
                key: "t",
                shiftKey: false,
                ctrlKey: false
            },
            shape: {
                rectangle: {
                    key: "r",
                    shiftKey: false,
                    ctrlKey: false
                },
                circle: {
                    key: "o",
                    shiftKey: false,
                    ctrlKey: false
                },
                hexagon: {
                    key: "h",
                    shiftKey: false,
                    ctrlKey: false
                }
            }
        }
    },
    selection: {
        all: {
            key: "a",
            shiftKey: false,
            ctrlKey: true
        },
        remove: [
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
        ]
    },
    locking: {
        lock: {
            key: "l",
            shiftKey: false,
            ctrlKey: true
        },
        unlock: {
            key: "l",
            shiftKey: true,
            ctrlKey: true
        }
    },
    styling: {
        bar: {
            key: "s",
            shiftKey: true,
            ctrlKey: false
        },
        contextMenu: {
            key: "c",
            shiftKey: true,
            ctrlKey: false
        }
    },
    api: {
        save: {
            key: "s",
            shiftKey: false,
            ctrlKey: true
        }
    },
    exchangeBuffer: {
        copy: {
            key: "c",
            shiftKey: false,
            ctrlKey: true
        },
        paste: {
            key: "v",
            shiftKey: false,
            ctrlKey: true
        },
        cut: {
            key: "x",
            shiftKey: false,
            ctrlKey: true
        }
    },
    cancellation: {
        undo: {
            key: "z",
            shiftKey: false,
            ctrlKey: true
        },
        redo: {
            key: "y",
            shiftKey: false,
            ctrlKey: true
        }
    }
} satisfies HotKeysMap;
