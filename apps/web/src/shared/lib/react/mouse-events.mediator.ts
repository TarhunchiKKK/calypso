import type { MouseEventHandlers, MouseEventsMediatorOptions } from "./types";

/**
 * The MouseEventsMediator class is a utility designed to manage and distinguish between single-clicks, double-clicks, and long-press mouse events.
 * It is useful in scenarios where different actions need to be triggered based on these distinct user interactions on the same UI element.
 *
 * How it works:
 * - It uses a system of timeouts to differentiate between event types.
 * - A single-click is registered if no second click occurs within a specified delay.
 * - A double-click is registered if a second click follows the first one within the same delay.
 * - A long-press (onMouseDown) is registered if the mouse button is held down for a specified duration.
 *
 * This class helps in creating more interactive and intuitive user interfaces
 * by providing granular control over mouse event handling.
 */
export class MouseEventsMediator {
    private handlers: MouseEventHandlers = {};

    private clickDelay: number;
    private mouseDownDelay: number;

    private clickTimeout: ReturnType<typeof setTimeout> | null = null;
    private mouseDownTimeout: ReturnType<typeof setTimeout> | null = null;

    private skipNextClick = false;

    public constructor(options: MouseEventsMediatorOptions) {
        this.clickDelay = options.clickDelay;
        this.mouseDownDelay = options.mouseDownDelay;
    }

    public setHandlers(handlers: MouseEventHandlers) {
        this.reset();

        this.handlers = handlers;
    }

    public onMouseDown(e: React.MouseEvent) {
        if (!this.handlers.onMouseDown) {
            return;
        }

        this.skipNextClick = false;

        this.mouseDownTimeout = setTimeout(() => {
            this.handlers.onMouseDown?.(e);
            this.mouseDownTimeout = null;
            this.skipNextClick = true;
        }, this.mouseDownDelay);
    }

    public onMouseUp(e: React.MouseEvent) {
        if (this.mouseDownTimeout) {
            clearTimeout(this.mouseDownTimeout);
            this.mouseDownTimeout = null;
        }

        this.handlers.onMouseUp?.(e);
    }

    public onClick(e: React.MouseEvent) {
        const needSkip = this.skipNextClick;

        if (!this.clickTimeout) {
            this.clickTimeout = setTimeout(() => {
                if (needSkip) {
                    this.skipNextClick = false;
                } else {
                    this.handlers.onClick?.(e);
                }

                this.clickTimeout = null;
            }, this.clickDelay);
        } else {
            if (needSkip) {
                this.skipNextClick = false;
            } else {
                this.handlers.onDoubleClick?.(e);
            }

            clearTimeout(this.clickTimeout);
            this.clickTimeout = null;
        }
    }

    /**
     * Resets the internal state of the mediator, clearing any pending timeouts.
     * This is useful for cleaning up when the component unmounts or when the interaction is cancelled.
     */
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
