"use client";

import { useRef } from "react";
import { Canvas } from "./ui/canvas";
import { Dots } from "./ui/dots";
import { Layout } from "./ui/layout";
import { Overlay } from "./ui/overlay";
import { useNodes } from "./nodes/use-nodes";
import { Sticker } from "lucide-react";

export function BoardEditor() {
    const canvasRef = useRef<HTMLDivElement>(null);

    const { nodes } = useNodes();

    return (
        <Layout>
            <Dots />

            <Canvas ref={canvasRef} overlay={<Overlay />}>
                {nodes.map(node => (
                    <Sticker key={node.id} sticker={node} />
                ))}
            </Canvas>
        </Layout>
    );
}
