import type { PropsWithChildren } from "react";
import { Skeleton } from "@/shared/ui/kit";
import { ActionsBar } from "./ui/actions-bar.component";
import { Canvas } from "./ui/canvas.component";
import { Dots } from "./ui/dots.component";
import { Layout } from "./ui/layout.component";
import { Overlay } from "./ui/overlay.component";
import type { ViewModel } from "./view-model/types";

const emptyAction = {
    active: false,
    onClick: () => {}
};

const actions: ViewModel["actions"] = {
    nodes: {
        idle: emptyAction,
        stickers: emptyAction,
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

const elements = [
    {
        x: 200,
        y: 200,
        width: 100,
        height: 100
    },
    {
        x: 200,
        y: 350,
        width: 100,
        height: 100
    },
    {
        x: 200,
        y: 500,
        width: 100,
        height: 100
    },
    {
        x: 350,
        y: 200,
        width: 100,
        height: 100
    },
    {
        x: 350,
        y: 350,
        width: 100,
        height: 100
    },
    {
        x: 350,
        y: 500,
        width: 100,
        height: 100
    },
    {
        x: 500,
        y: 200,
        width: 100,
        height: 100
    },
    {
        x: 500,
        y: 350,
        width: 100,
        height: 100
    },
    {
        x: 500,
        y: 500,
        width: 100,
        height: 100
    }
];

export function BoardEditorSkeleton({ children }: PropsWithChildren) {
    return (
        <Layout>
            <Dots dimensions={layoutDimensions} />

            <Canvas dimensions={layoutDimensions} overlay={<Overlay />}>
                {elements.map((element, index) => (
                    <Skeleton key={index} style={{ position: "absolute", left: element.x, top: element.y, width: element.width, height: element.height }} />
                ))}
            </Canvas>

            <ActionsBar actions={actions} />

            {children}
        </Layout>
    );
}
