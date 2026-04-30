import type { PropsWithChildren } from "react";
import { ActionsBar } from "./ui/actions-bar.component";
import { Canvas } from "./ui/canvas.component";
import { Dots } from "./ui/dots.component";
import { Layout } from "./ui/layout.component";
import { Overlay } from "./ui/overlay.component";
import type { ViewModel } from "./view-model/types";

const emptyAction = {
    isActive: false,
    onClick: () => {}
};

const actions: ViewModel["actions"] = {
    nodes: {
        idle: emptyAction,
        stickers: emptyAction,
        arrows: emptyAction,
        text: emptyAction,
        shapes: emptyAction,
        media: emptyAction,
        notes: emptyAction,
        draw: emptyAction
    },
    exchangeBuffer: {
        copy: emptyAction,
        paste: emptyAction,
        cut: emptyAction
    },
    cancellation: {
        undo: emptyAction,
        redo: emptyAction
    }
};

const layoutDimensions = {
    offset: {
        dx: 0,
        dy: 0
    },
    zoom: 1
};

export function BoardEditorSkeleton({ children }: PropsWithChildren) {
    return (
        <Layout>
            <Dots {...layoutDimensions} />

            <Canvas {...layoutDimensions} overlay={<Overlay />}></Canvas>

            <ActionsBar actions={actions} />

            {children}
        </Layout>
    );
}
