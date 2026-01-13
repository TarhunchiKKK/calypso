import type React from "react";
import { NodeDecorator } from "../../core";

export class SelectedNodeDecorator extends NodeDecorator {
    public override render(children?: React.ReactNode) {
        return this.entry.render(
            <>
                <div className="absolute top-0 left-0 w-full h-full outline-2 outline-blue-500"></div>

                {children}
            </>
        );
    }
}
