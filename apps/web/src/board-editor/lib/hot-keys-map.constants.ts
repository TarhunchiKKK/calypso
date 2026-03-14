import type { HotKey } from "@/shared/lib/hot-keys";

type Map = {
    [Key: string]: HotKey | HotKey[] | Map;
};

// TODO: add missing hot keys
export const HotKeysMap = {
    switch: {
        toIdle: [
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
        toStickersCreation: {
            key: "s",
            shiftKey: false,
            ctrlKey: false
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
    }
} satisfies Map;
