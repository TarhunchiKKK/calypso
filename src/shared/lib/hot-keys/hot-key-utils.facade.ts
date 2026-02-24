import type { HotKey } from "./types";

export class HotKeyUtils {
    public static is(hotKey: HotKey | HotKey[], e: React.KeyboardEvent) {
        const hotKeys = Array.isArray(hotKey) ? hotKey : [hotKey];

        for (const hotKey of hotKeys) {
            const result = HotKeyUtils.is(hotKey, e);

            if (result) {
                return true;
            }
        }

        return false;
    }
}
