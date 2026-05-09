import type { BindableNodeStrategy } from "@/board-editor/modules/arrows-binding";
import { BindableRectNodeStrategy } from "../../shared/strategies";
import { BindableShapeStrategy } from "../../variants/shape/strategies/bindable.strategy";
import type { StrategiesMap } from "./types";

const BindableRectNodeStrategyInstance = new BindableRectNodeStrategy();

export const BindableStrategiesMap: StrategiesMap<BindableNodeStrategy> = {
    sticker: BindableRectNodeStrategyInstance,
    arrow: null,
    text: BindableRectNodeStrategyInstance,
    shape: new BindableShapeStrategy(),
    media: BindableRectNodeStrategyInstance,
    note: BindableRectNodeStrategyInstance,
    drawing: null
};
