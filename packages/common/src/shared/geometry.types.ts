import type { Id } from "entry";

export type Point = {
    x: number;

    y: number;
};

export type RelativePoint = Point & {
    relativeTo?: Id;
};

export type Rect = {
    x: number;

    y: number;

    width: number;

    height: number;
};

export type Offset = {
    dx: number;

    dy: number;
};
