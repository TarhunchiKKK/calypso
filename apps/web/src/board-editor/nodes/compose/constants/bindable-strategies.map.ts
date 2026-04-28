import type { BindableNodeStrategy } from "@/board-editor/modules/arrows-binding";
import { BindableMediaNodeStrategy } from "../../variants/media/strategies/bindable.strategy";
import { BindableShapeStrategy } from "../../variants/shape/strategies/bindable.strategy";
import { BindableStickerStrategy } from "../../variants/sticker/strategies/bindable.strategy";
import { BindableTextNodeStrategy } from "../../variants/text/strategies/binding.strategy";
import type { StrategiesMap } from "./types";

export const BindableStrategiesMap: StrategiesMap<BindableNodeStrategy> = {
    sticker: new BindableStickerStrategy(),
    arrow: null,
    text: new BindableTextNodeStrategy(),
    shape: new BindableShapeStrategy(),
    media: new BindableMediaNodeStrategy()
};
