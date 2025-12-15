import React from "react";

type HandledEvent = MouseEvent | React.MouseEvent;

type MouseEventHandlers = {
    onClick?: (e: HandledEvent) => void;
    onDoubleClick?: (e: HandledEvent) => void;
    onMouseDown?: (e: HandledEvent) => void;
    onMouseUp?: (e: HandledEvent) => void;
};

type MouseEventsMediatorOptions = {
    clickDelay?: number;
    mouseDownDelay?: number;
};

const DEFAULT_CLICK_DELAY = 250;
const DEFAULT_MOUSE_DOWN_DELAY = 250;

export class MouseEventsMediator {
    private clickDelay: number;
    private mouseDownDelay: number;

    private clickTimeout: ReturnType<typeof setTimeout> | null = null;
    private mouseDownTimeout: ReturnType<typeof setTimeout> | null = null;

    public constructor(options: MouseEventsMediatorOptions = {}) {
        this.clickDelay = options.clickDelay ?? DEFAULT_CLICK_DELAY;
        this.mouseDownDelay = options.mouseDownDelay ?? DEFAULT_MOUSE_DOWN_DELAY;
    }

    public createHandlers(handlers: MouseEventHandlers): MouseEventHandlers {
        return {
            onMouseDown: this.createMouseDown(handlers),
            onMouseUp: this.createMouseUp(handlers),
            onClick: this.createClick(handlers)
        };
    }

    private createMouseDown(handlers: MouseEventHandlers) {
        return (e: HandledEvent) => {
            if (!handlers.onMouseDown) {
                return;
            }

            setTimeout(() => {
                handlers.onMouseDown?.(e);
                this.mouseDownTimeout = null;
            }, this.mouseDownDelay);
        };
    }

    private createMouseUp(handlers: MouseEventHandlers) {
        return (e: HandledEvent) => {
            if (this.mouseDownTimeout) {
                clearTimeout(this.mouseDownTimeout);
                this.mouseDownTimeout = null;
            }

            handlers.onMouseUp?.(e);
        };
    }

    private createClick(handlers: MouseEventHandlers) {
        return (e: HandledEvent) => {
            if (!this.clickTimeout) {
                this.clickTimeout = setTimeout(() => {
                    handlers.onClick?.(e);
                    this.clickTimeout = null;
                }, this.clickDelay);
            } else {
                clearTimeout(this.clickTimeout);
                this.clickTimeout = null;
                handlers.onDoubleClick?.(e);
            }
        };
    }

    public reset() {
        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout);
            this.clickTimeout = null;
        }

        if (this.mouseDownTimeout) {
            clearTimeout(this.mouseDownTimeout);
            this.mouseDownTimeout = null;
        }
    }
}
