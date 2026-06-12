import { queryKeys } from "./api.lib";
import { findPresetsOptions, useFindPresets } from "./find-presets.api";
import { findPresetsGroupsOptions, useFindPresetsGroups } from "./find-presets-groups.api";
import { useGetPresignedUrl } from "./get-presigned-url.api";
import { useRandomMedia } from "./random-media.api";

export const MediaApi = {
    queryKeys,
    options: {
        findPresets: findPresetsOptions,
        findPresetsGroups: findPresetsGroupsOptions
    },
    useFindPresets,
    useFindPresetsGroups,
    useGetPresignedUrl,
    useRandomMedia
};
