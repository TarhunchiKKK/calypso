import type { NodeBase } from "@repo/boards-common";
import type { Decoratable } from "../types/decorators.types";
import type { Renderable } from "../types/ui.types";

export type NodeHandlers = {
    onMouseDown?: React.MouseEventHandler;

    onMouseUp?: React.MouseEventHandler;

    onMouseEnter?: React.MouseEventHandler;

    onMouseLeave?: React.MouseEventHandler;
};

export type NodeUiSettings = {
    showContent: boolean;

    noPointerEvents: boolean;
};

export abstract class NodeWrapper<T extends NodeBase = NodeBase> implements Renderable, Decoratable<T> {
    protected handlers: NodeHandlers = {};

    protected uiSettings: NodeUiSettings = {
        showContent: true,
        noPointerEvents: false
    };

    public constructor(protected node: T) {}

    public get id() {
        return this.node.id;
    }

    public get type() {
        return this.node.type;
    }

    public get data() {
        return this.node;
    }

    public set data(node: T) {
        this.node = node;
    }

    public get wrapper() {
        return this;
    }

    public setUiSetting<Setting extends keyof NodeUiSettings>(key: Setting, value: NodeUiSettings[Setting]) {
        this.uiSettings[key] = value;
        return this;
    }

    public setHandlers(handlers: NodeHandlers) {
        this.handlers = handlers;
        return this;
    }

    public abstract render(children?: React.ReactNode): React.ReactNode;
}
