import type { HotKey } from "./types";

export class HotKeyUtils {
    public static is(hotKey: HotKey | HotKey[], e: React.KeyboardEvent) {
        const hotKeys = Array.isArray(hotKey) ? hotKey : [hotKey];

        for (const hotKey of hotKeys) {
            const result = hotKey.key === e.key && hotKey.shiftKey === e.shiftKey && hotKey.ctrlKey === e.ctrlKey;

            if (result) {
                return true;
            }
        }

        return false;
    }

    public static stringify(hotKey: HotKey) {
        const words: string[] = [];

        if (hotKey.ctrlKey) {
            words.push("Ctrl");
        }

        if (hotKey.shiftKey) {
            words.push("Shift");
        }

        words.push(hotKey.key.toUpperCase());

        return words.join("+");
    }
}
