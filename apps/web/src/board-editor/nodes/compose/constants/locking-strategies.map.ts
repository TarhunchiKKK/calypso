import type { NodeLockingStrategy } from "@/board-editor/modules/locking";
import { RectNodeLockingStrategy } from "../../shared/strategies";
import { ArrowNodeLockingStrategy } from "../../variants/arrow/strategies/locking.strategy";
import { DrawingNodeLockingStrategy } from "../../variants/drawing/strategies/locking.strategy";
import type { StrategiesMap } from "./types";

const RectNodeLockingStrategyInstance = new RectNodeLockingStrategy();

export const LockingStrategiesMap: StrategiesMap<NodeLockingStrategy> = {
    sticker: RectNodeLockingStrategyInstance,
    arrow: new ArrowNodeLockingStrategy(),
    text: RectNodeLockingStrategyInstance,
    shape: RectNodeLockingStrategyInstance,
    media: RectNodeLockingStrategyInstance,
    note: RectNodeLockingStrategyInstance,
    drawing: new DrawingNodeLockingStrategy()
};
