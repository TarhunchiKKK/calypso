import type { NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";
import { MediaNodeBindingStrategy } from "../../variants/media/strategies/binding.strategy";
import { ShapeBindingStrategy } from "../../variants/shape/strategies/binding.strategy";
import { StickerBindingStrategy } from "../../variants/sticker/strategies/binding.strategy";
import { TextNodeBindingStrategy } from "../../variants/text/strategies/binding.strategy";
import type { StrategiesMap } from "./types";

export const BindingStrategiesMap: StrategiesMap<NodeBindingStrategy> = {
    sticker: new StickerBindingStrategy(),
    arrow: null,
    text: new TextNodeBindingStrategy(),
    shape: new ShapeBindingStrategy(),
    media: new MediaNodeBindingStrategy()
};
