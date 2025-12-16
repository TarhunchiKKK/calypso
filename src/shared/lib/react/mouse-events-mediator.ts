// TODO: This class need documentation

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
