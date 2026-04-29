import type { BindableNodeStrategy } from "@/board-editor/modules/arrows-binding";
import { BindableShapeStrategy } from "../../variants/shape/strategies/bindable.strategy";
import type { StrategiesMap } from "./types";
import { BindableRectNodeStrategy } from "../../shared/strategies";

const BindableRectNodeStrategyInstance = new BindableRectNodeStrategy();

export const BindableStrategiesMap: StrategiesMap<BindableNodeStrategy> = {
    sticker: BindableRectNodeStrategyInstance,
    arrow: null,
    text: BindableRectNodeStrategyInstance,
    shape: new BindableShapeStrategy(),
    media: BindableRectNodeStrategyInstance
};
