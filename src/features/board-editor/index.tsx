"use client";

import { Canvas } from "./canvas/canvas";
import { Dots } from "./ui/dots";
import { Layout } from "./ui/layout";
import { Overlay } from "./ui/overlay";
import { useNodes } from "./nodes/use-nodes";
import { useCanvasRect } from "./canvas/use-canvas-rect";
import { useViewModel } from "./view-model/use-view-model";

export function BoardEditor() {
    const { canvasRect, canvasRef } = useCanvasRect();

    const nodesModel = useNodes();

    const viewModel = useViewModel({ nodesModel, canvasRect });

    return (
        <Layout>
            <Dots />

            <Canvas ref={canvasRef} overlay={<Overlay />} onClick={viewModel.canvas?.onClick}>
                {viewModel.nodes.map(node => node.render())}
            </Canvas>
        </Layout>
    );
}
