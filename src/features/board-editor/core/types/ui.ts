import type React from "react";

export type Renderable = {
    get id(): string;

    render(children?: React.ReactNode): React.ReactNode;
};
