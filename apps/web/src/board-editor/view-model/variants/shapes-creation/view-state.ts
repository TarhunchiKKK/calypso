import type { Boards } from "@repo/common";

export type ShapesCreationViewState = {
    type: "shapes-creation";

    variant: Boards.ShapeVariants;
};
