"use client";

import { Canvas } from "./ui/canvas.component";
import { Dots } from "./ui/dots.component";
import { Layout } from "./ui/layout.component";
import { Overlay } from "./ui/overlay.component";
import { useNodes } from "./nodes/use-nodes.hook";
import { useViewModel } from "./view-model/use-view-model.hook";
import { ActionButton, ActionsBar } from "./ui/action-bar.component";
import { MousePointer2, StickerIcon } from "lucide-react";
import { SelectionWindow } from "./ui/selection-window.component";
import { AnyNode } from "./nodes/compose/types";
import { useCanvasRect, useWindowShift } from "./modules/layout-dimensions";
import { useWindowEvents } from "./lib/window";

type Props = {
    nodes: AnyNode[];
};

export function BoardEditor({ nodes }: Props) {
    const { canvasRect, canvasRef } = useCanvasRect();

    const nodesModel = useNodes(nodes);

    const windowShiftModel = useWindowShift();

    const viewModel = useViewModel({ nodesModel, canvasRect, windowShiftModel });

    useWindowEvents(viewModel.window || {});

    return (
        <Layout onKeyDown={viewModel.layout?.onKeyDown}>
            <Dots windowShift={windowShiftModel.windowShift} />

            <Canvas
                ref={canvasRef}
                windowShift={windowShiftModel.windowShift}
                overlay={
                    <Overlay
                        onKeyDown={viewModel.overlay?.onKeyDown}
                        onMouseDown={viewModel.overlay?.onMouseDown}
                        onMouseUp={viewModel.overlay?.onMouseUp}
                        onClick={viewModel.overlay?.onClick}
                    />
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
