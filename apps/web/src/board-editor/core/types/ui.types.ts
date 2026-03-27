import type { Id } from "@repo/common";
import type React from "react";

export type Renderable = {
    get id(): Id;

    render(children?: React.ReactNode): React.ReactNode;
};
