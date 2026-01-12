import { ResizeDirection } from "../types";

export abstract class ResizeStrategy {
    public constructor(
        /*
            DELETE: this param is not necessary
            node id should be recognized via `withNodeId` function
        */
        protected readonly nodeId: string,

        protected readonly handler: (nodeId: string, direction: ResizeDirection) => void
    ) {}

    public abstract ui(): React.ReactNode;
}
