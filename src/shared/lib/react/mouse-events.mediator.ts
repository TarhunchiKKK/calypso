type MouseEventHandlers<E> = {
    onClick?: (e: E) => void;
    onDoubleClick?: (e: E) => void;
    onMouseDown?: (e: E) => void;
    onMouseUp?: (e: E) => void;
};

type MouseEventsMediatorOptions = {
    clickDelay?: number;
    mouseDownDelay?: number;
};

const DEFAULT_CLICK_DELAY = 250;
const DEFAULT_MOUSE_DOWN_DELAY = 250;

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
export class MouseEventsMediator<E = never> {
    private clickDelay: number;
    private mouseDownDelay: number;

    private clickTimeout: ReturnType<typeof setTimeout> | null = null;
    private mouseDownTimeout: ReturnType<typeof setTimeout> | null = null;

    private skipNextClick = false;

    public constructor(options: MouseEventsMediatorOptions = {}) {
        this.clickDelay = options.clickDelay ?? DEFAULT_CLICK_DELAY;
        this.mouseDownDelay = options.mouseDownDelay ?? DEFAULT_MOUSE_DOWN_DELAY;
    }

    // OPTIMIZE: result of handlers creating can be saved in this class

    /**
     * Creates a set of mouse event handlers that are mediated by the class instance.
     * @param handlers - An object containing the original event handlers to be called by the mediator.
     * @returns An object with onMouseDown, onMouseUp, and onClick handlers that should be spread onto a component.
     */
    public createHandlers(handlers: MouseEventHandlers<E>) {
        return {
            onMouseDown: this.createMouseDown(handlers),
            onMouseUp: this.createMouseUp(handlers),
            onClick: this.createClick(handlers)
        };
    }

    private createMouseDown(handlers: MouseEventHandlers<E>) {
        return (e: E) => {
            if (!handlers.onMouseDown) {
                return;
            }

            this.skipNextClick = false;

            this.mouseDownTimeout = setTimeout(() => {
                handlers.onMouseDown?.(e);
                this.mouseDownTimeout = null;
                this.skipNextClick = true;
            }, this.mouseDownDelay);
        };
    }

    private createMouseUp(handlers: MouseEventHandlers<E>) {
        return (e: E) => {
            if (this.mouseDownTimeout) {
                clearTimeout(this.mouseDownTimeout);
                this.mouseDownTimeout = null;
            }

            handlers.onMouseUp?.(e);
        };
    }

    private createClick(handlers: MouseEventHandlers<E>) {
        return (e: E) => {
            const needSkip = this.skipNextClick;

            if (!this.clickTimeout) {
                this.clickTimeout = setTimeout(() => {
                    if (needSkip) {
                        this.skipNextClick = false;
                    } else {
                        handlers.onClick?.(e);
                    }

                    this.clickTimeout = null;
                }, this.clickDelay);
            } else {
                if (needSkip) {
                    this.skipNextClick = false;
                } else {
                    handlers.onDoubleClick?.(e);
                }

                clearTimeout(this.clickTimeout);
                this.clickTimeout = null;
            }
        };
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
