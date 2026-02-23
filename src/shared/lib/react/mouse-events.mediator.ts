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
    private options: Required<MouseEventsMediatorOptions>;

    private mouseDownTime: number = 0;
    private mouseDownTarget: EventTarget | null = null;
    private mouseDownProcessed: boolean = false;
    private clickCount: number = 0;
    private lastClickTime: number = 0;
    private lastClickTarget: EventTarget | null = null;

    private mouseDownTimeout: ReturnType<typeof setTimeout> | null = null;
    private clickTimeout: ReturnType<typeof setTimeout> | null = null;

    public constructor(options: MouseEventsMediatorOptions) {
        this.options = options;
    }

    public setHandlers(handlers: MouseEventHandlers) {
        this.reset();
        this.handlers = handlers;
    }

    public onMouseDown(e: React.MouseEvent) {
        const now = Date.now();

        this.mouseDownTime = now;
        this.mouseDownTarget = e.target;
        this.mouseDownProcessed = false;

        if (this.lastClickTarget === e.target && now - this.lastClickTime < this.options.doubleClickDelay) {
            this.clickCount++;
        } else {
            this.clickCount = 1;
        }

        if (this.handlers.onMouseDown) {
            if (this.mouseDownTimeout) {
                clearTimeout(this.mouseDownTimeout);
            }

            this.mouseDownTimeout = setTimeout(() => {
                if (!this.mouseDownProcessed) {
                    this.handlers.onMouseDown?.(e);
                    this.mouseDownProcessed = true;
                }
                this.mouseDownTimeout = null;
            }, this.options.mouseDownDelay);
        }
    }

    public onMouseUp(e: React.MouseEvent) {
        const now = Date.now();
        const timeFromMouseDown = now - this.mouseDownTime;

        if (this.mouseDownTimeout && timeFromMouseDown < this.options.mouseDownDelay) {
            clearTimeout(this.mouseDownTimeout);
            this.mouseDownTimeout = null;
            this.mouseDownProcessed = false;
        }

        this.handlers.onMouseUp?.(e);

        const isClick = timeFromMouseDown < this.options.clickDelay && this.mouseDownTarget === e.target && !this.mouseDownProcessed;

        if (isClick) {
            this.handlePotentialClick(e);
        }

        this.mouseDownTarget = null;
        this.mouseDownProcessed = false;
    }

    private handlePotentialClick(e: React.MouseEvent) {
        const now = Date.now();

        if (this.clickCount === 2 && this.lastClickTarget === e.target && now - this.lastClickTime < this.options.doubleClickDelay) {
            if (this.clickTimeout) {
                clearTimeout(this.clickTimeout);
                this.clickTimeout = null;
            }

            this.handlers.onDoubleClick?.(e);
            this.clickCount = 0;
            this.lastClickTime = 0;
            this.lastClickTarget = null;
            return;
        }

        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout);
        }

        this.lastClickTime = now;
        this.lastClickTarget = e.target;

        this.clickTimeout = setTimeout(() => {
            if (this.clickCount === 1) {
                this.handlers.onClick?.(e);
            }

            this.clickTimeout = null;
            this.clickCount = 0;
            this.lastClickTime = 0;
            this.lastClickTarget = null;
        }, this.options.doubleClickDelay);
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

        this.mouseDownTime = 0;
        this.mouseDownTarget = null;
        this.mouseDownProcessed = false;
        this.clickCount = 0;
        this.lastClickTime = 0;
        this.lastClickTarget = null;
    }
}
