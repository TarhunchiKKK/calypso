import React from "react";

export abstract class EditNodeStrategy<Data> {
    public constructor(protected readonly handler: (data: Data) => void) {}

    public abstract ui(): React.ReactNode;
}
