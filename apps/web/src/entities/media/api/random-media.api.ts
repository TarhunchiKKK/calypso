import type { FindPresetsDto } from "@lib/media";
import { useMemo } from "react";
import { useFindPresets } from "./find-presets.api";

export function useRandomMedia(dto: FindPresetsDto) {
    const { data: thumbnails } = useFindPresets(dto);

    return useMemo(() => {
        if (!thumbnails) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * thumbnails.length);

        return thumbnails[randomIndex];
    }, [thumbnails]);
}
