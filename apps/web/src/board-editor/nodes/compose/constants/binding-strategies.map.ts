import type { NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";
import { ArrowBindingStrategy } from "../../variants/arrow/strategies/binding.strategy";
import type { StrategiesMap } from "./types";

export const BindingStrategiesMap: StrategiesMap<NodeBindingStrategy> = {
    sticker: null,
    arrow: new ArrowBindingStrategy(),
    text: null,
    shape: null,
    media: null,
    note: null,
    drawing: null
};
