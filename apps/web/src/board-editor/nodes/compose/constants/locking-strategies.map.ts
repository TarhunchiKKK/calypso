import type { NodeLockingStrategy } from "@/board-editor/modules/locking";
import { RectNodeLockingStrategy } from "../../shared/strategies";
import { ArrowLockingStrategy } from "../../variants/arrow/strategies/locking.strategy";
import type { StrategiesMap } from "./types";

const RectNodeLockingStrategyInstance = new RectNodeLockingStrategy();

export const LockingStrategiesMap: StrategiesMap<NodeLockingStrategy> = {
    sticker: RectNodeLockingStrategyInstance,
    arrow: new ArrowLockingStrategy(),
    text: RectNodeLockingStrategyInstance,
    shape: RectNodeLockingStrategyInstance,
    media: RectNodeLockingStrategyInstance,
    note: RectNodeLockingStrategyInstance
};
