import type React from "react";
import type { MouseEventsMediator } from "./mouse-events.mediator";

export class MouseEventsSeparator {
    public constructor(
        public readonly left: MouseEventsMediator,
        public readonly right: MouseEventsMediator
    ) {}

    public onMouseDown(e: React.MouseEvent) {
        if (e.button === 2) {
            this.right.onMouseDown(e);
        } else {
            this.left.onMouseDown(e);
        }
    }

    public onMouseUp(e: React.MouseEvent) {
        if (e.button === 2) {
            this.right.onMouseUp(e);
        } else {
            this.left.onMouseUp(e);
        }
    }

    public onClick(e: React.MouseEvent) {
        if (e.button === 2) {
            this.right.onClick(e);
        } else {
            this.left.onClick(e);
        }
    }

    public get handlers() {
        return {
            onMouseDown: this.onMouseDown,
            onMouseUp: this.onMouseUp,
            onClick: this.onClick
        };
    }
}
