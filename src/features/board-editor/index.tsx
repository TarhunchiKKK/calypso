"use client";

import { useRef } from "react";
import { Canvas } from "./ui/canvas";
import { Dots } from "./ui/dots";

export function BoardEditor() {
    const canvasRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <Dots />

            <Canvas ref={canvasRef} overlay={<div></div>}>
                <div>This is canvas</div>
            </Canvas>
        </div>
    );
}
