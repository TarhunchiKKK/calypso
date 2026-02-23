export type MouseEventHandlers = {
    onClick?: (e: React.MouseEvent) => void;
    onDoubleClick?: (e: React.MouseEvent) => void;
    onMouseDown?: (e: React.MouseEvent) => void;
    onMouseUp?: (e: React.MouseEvent) => void;
};

export type MouseEventsMediatorOptions = {
    clickDelay: number;
    mouseDownDelay: number;
    doubleClickDelay: number;
};
