import { NodeSelectionStrategy } from "@/board-editor/modules/selection";

export class RectNodeSelectionStrategy extends NodeSelectionStrategy {
    public override ui() {
        return (
            <div className="absolute top-0 left-0 w-full h-full outline-2 outline-selection"></div>
        );
    }
}
