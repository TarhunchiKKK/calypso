"use client";

import { Canvas } from "./canvas/canvas";
import { Dots } from "./ui/dots";
import { Layout } from "./ui/layout";
import { Overlay } from "./ui/overlay";
import { useNodes } from "./nodes/use-nodes";
import { useCanvasRect } from "./canvas/use-canvas-rect";

export function BoardEditor() {
    const { canvasRef } = useCanvasRect();

    const { nodes } = useNodes();

    return (
        <Layout>
            <Dots />

            <Canvas ref={canvasRef} overlay={<Overlay />}>
                {nodes.map(node => node.render())}
            </Canvas>
        </Layout>
    );
}
