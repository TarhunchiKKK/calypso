"use client";

import { Canvas } from "./ui/canvas";
import { Dots } from "./ui/dots";
import { Layout } from "./ui/layout";
import { Overlay } from "./ui/overlay";
import { useNodes } from "./nodes/use-nodes";
import { useCanvasRect } from "./view-model/hooks/use-canvas-rect";
import { useViewModel } from "./view-model/use-view-model";
import { ActionButton, ActionsBar } from "./ui/action-bar";
import { MousePointer2, StickerIcon } from "lucide-react";
import { useWindowEvents } from "./view-model/hooks/use-window-events";
import { SelectionWindow } from "./ui/selection-window";

export function BoardEditor() {
    const { canvasRect, canvasRef } = useCanvasRect();

    const nodesModel = useNodes();

    const viewModel = useViewModel({ nodesModel, canvasRect });

    useWindowEvents(viewModel.window || {});

    return (
        <Layout onKeyDown={viewModel.layout?.onKeyDown}>
            <Dots />

            <Canvas
                ref={canvasRef}
                overlay={
                    <Overlay onKeyDown={viewModel.overlay?.onKeyDown} onMouseDown={viewModel.overlay?.onMouseDown} />
                }
                onClick={viewModel.canvas?.onClick}
                onKeyDown={viewModel.canvas?.onKeyDown}
            >
                {viewModel.nodes.map(node => node.render())}

                {viewModel.selectionWindow && <SelectionWindow {...viewModel.selectionWindow} />}
            </Canvas>

            <ActionsBar>
                <ActionButton isActive={viewModel.actions?.idle?.isActive} onClick={viewModel.actions?.idle?.onClick}>
                    <MousePointer2 />
                </ActionButton>

                <ActionButton
                    isActive={viewModel.actions?.stickers?.isActive}
                    onClick={viewModel.actions?.stickers?.onClick}
                >
                    <StickerIcon />
                </ActionButton>
            </ActionsBar>
        </Layout>
    );
}
