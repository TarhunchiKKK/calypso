"use client";

import { useRef } from "react";
import { Canvas } from "./ui/canvas";
import { Dots } from "./ui/dots";
import { Layout } from "./ui/layout";
import { Overlay } from "./ui/overlay";

export function BoardEditor() {
    const canvasRef = useRef<HTMLDivElement>(null);

    return (
        <Layout>
            <Dots />

            <Canvas ref={canvasRef} overlay={<Overlay />}></Canvas>
        </Layout>
    );
}
