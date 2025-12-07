"use client";

import { useRef } from "react";
import { Canvas } from "./ui/canvas";

export function BoardEditor() {
    const canvasRef = useRef<HTMLDivElement>(null);

    return (
        <Canvas ref={canvasRef} overlay={<div></div>}>
            <div>This is canvas</div>
        </Canvas>
    );
}
