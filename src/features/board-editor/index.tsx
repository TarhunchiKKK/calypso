"use client";

import { Canvas } from "./ui/canvas";
import { Dots } from "./ui/dots";
import { Layout } from "./ui/layout";
import { Overlay } from "./ui/overlay";
import { useNodes } from "./nodes/use-nodes";
import { useCanvasRect } from "./hooks/use-canvas-rect";
import { useViewModel } from "./view-model/use-view-model";
import { ActionButton, ActionsBar } from "./ui/action-bar";
import { MousePointer2, StickerIcon } from "lucide-react";
import { useWindowEvents } from "./hooks/use-window-events";
import { SelectionWindow } from "./ui/selection-window";
import { AnyNode } from "./nodes/compose/types";
import { useWindowShifting } from "./modules/window-shifting";

type Props = {
    nodes: AnyNode[];
};

export function BoardEditor({ nodes }: Props) {
    const { canvasRect, canvasRef } = useCanvasRect();

    const nodesModel = useNodes(nodes);

    const windowShiftingModel = useWindowShifting();

    const viewModel = useViewModel({ nodesModel, canvasRect, windowShiftingModel });

    useWindowEvents(viewModel.window || {});

    return (
        <Layout onKeyDown={viewModel.layout?.onKeyDown}>
            <Dots windowShift={windowShiftingModel.windowShift} />

            <Canvas
                ref={canvasRef}
                windowShift={windowShiftingModel.windowShift}
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
