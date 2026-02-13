import type React from "react";
import type { MouseEventsMediator } from "./mouse-events.mediator";
import type { MouseEventHandlers } from "./types";

export class MouseEventsSeparator {
    public constructor(
        private readonly left: MouseEventsMediator,
        private readonly right: MouseEventsMediator
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
        console.log(e.button);

        if (e.button === 2) {
            this.right.onClick(e);
        } else {
            this.left.onClick(e);
        }
    }

    public setHandlers(handlers: { left?: MouseEventHandlers; right?: MouseEventHandlers }) {
        this.left.setHandlers(handlers.right ?? {});
        this.right.setHandlers(handlers.left ?? {});
    }

    public reset() {
        this.left.reset();
        this.right.reset();
    }
}
