import { ResizeHandler } from "../types";

export abstract class ResizeStrategy {
    public constructor(protected readonly handler?: ResizeHandler) {}

    public abstract ui(): React.ReactNode;
}
