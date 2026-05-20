import type React from "react";
import type { Renderable } from "../../core";

type Action = {
    active: boolean;

    onClick?: React.MouseEventHandler;

    disabled?: boolean;

    title: string;

    shortcut?: string;
};

export type ViewModel = {
    nodes: Renderable[];

    layout?: {
        onKeyDown?: React.KeyboardEventHandler;
    };

    canvas?: {
        onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
        onMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void;
        onKeyDown?: React.KeyboardEventHandler;
    };

    overlay?: {
        onKeyDown?: React.KeyboardEventHandler;
        onMouseDown?: React.MouseEventHandler;
        onMouseUp?: React.MouseEventHandler;
    };

    window?: {
        onMouseMove?: (e: MouseEvent) => void;
        onMouseUp?: (e: MouseEvent) => void;
        onWheel?: (e: WheelEvent) => void;
    };

    additionalElements?: {
        canvas?: React.ReactNode;
        layout?: React.ReactNode;
        actionsBar?: React.ReactNode;
    };

    actions: {
        nodes: {
            idle: Action;
            stickers: Action;
            text: Action;
            shapes: Action;
            media: Action;
            notes: Action;
            draw: Action;
        };
        exchangeBuffer: {
            copy: Action;
            paste: Action;
            cut: Action;
        };
        cancellation: {
            undo: Action;
            redo: Action;
        };
    };
};
