import type { Id } from "@lib/common";
import type React from "react";

export type Renderable = {
    get id(): Id;

    render(children?: React.ReactNode): React.ReactNode;
};
