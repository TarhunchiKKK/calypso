import { StickersViewState } from "./view-state";

export function switchToStickers(): StickersViewState {
    return {
        type: "stickers"
    };
}
