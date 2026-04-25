import type { NodeLockingStrategy } from "@/board-editor/modules/locking";
import { RectNodeLockingStrategy } from "../../shared/strategies";
import { ArrowLockingStrategy } from "../../variants/arrow/strategies/locking.strategy";
import type { StrategiesMap } from "./types";

export const LockingStrategiesMap: StrategiesMap<typeof NodeLockingStrategy> = {
    sticker: () => new RectNodeLockingStrategy(),
    arrow: () => new ArrowLockingStrategy(),
    text: () => new RectNodeLockingStrategy(),
    shape: () => new RectNodeLockingStrategy(),
    media: () => new RectNodeLockingStrategy()
};
