import type { UpdateFn } from "../types";
import { StylesGroupWrapper } from "./styles-group-wrapper.component";

type Props = {
    onUpdate: (fn: UpdateFn) => void;
};

export function TextFormattingGroup({ onUpdate }: Props) {
    return <StylesGroupWrapper></StylesGroupWrapper>;
}
