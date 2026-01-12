import { ResizeDirection } from "../types";

export abstract class ResizeStrategy {
    public constructor(
        protected readonly nodeId: string,

        protected readonly handler: (nodeId: string, direction: ResizeDirection) => void
    ) {}

    public abstract ui(): React.ReactNode;
}
