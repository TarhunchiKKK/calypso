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

    public setHandlers(handlers: { left?: MouseEventHandlers; right?: MouseEventHandlers }) {
        if (handlers.left) {
            this.left.setHandlers(handlers.left);
        }

        if (handlers.right) {
            this.right.setHandlers(handlers.right);
        }
    }

    public reset() {
        this.left.reset();
        this.right.reset();
    }

    public get handlers() {
        return {
            onMouseDown: (e: React.MouseEvent) => this.onMouseDown(e),
            onMouseUp: (e: React.MouseEvent) => this.onMouseUp(e)
        };
    }
}
