"use client";

import { MousePointer2, StickerIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import { useWindowEvents } from "../shared/lib/window";
import type { NodeBase } from "./core";
import { useLayoutDimensionsModel } from "./modules/layout-dimensions";
import { useNodesModel } from "./nodes";
import { ActionButton, ActionsBar } from "./ui/action-bar.component";
import { Canvas } from "./ui/canvas.component";
import { Dots } from "./ui/dots.component";
import { Layout } from "./ui/layout.component";
import { Overlay } from "./ui/overlay.component";
import { useViewModel } from "./view-model/use-view-model.hook";

type Props = PropsWithChildren<{
    nodes: NodeBase[];
}>;

export function BoardEditor({ nodes, children }: Props) {
    const nodesModel = useNodesModel(nodes);

    const layoutDimensionsModel = useLayoutDimensionsModel();

    const viewModel = useViewModel({
        nodesModel,
        layoutDimensionsModel
    });

    useWindowEvents(viewModel.window || {});

    return (
        <Layout onKeyDown={viewModel.layout?.onKeyDown}>
            <Dots offset={layoutDimensionsModel.layoutOffset.offset} zoom={layoutDimensionsModel.layoutZoom.zoom} />

            <Canvas
                offset={layoutDimensionsModel.layoutOffset.offset}
                zoom={layoutDimensionsModel.layoutZoom.zoom}
                overlay={
                    <Overlay onKeyDown={viewModel.overlay?.onKeyDown} onMouseDown={viewModel.overlay?.onMouseDown} onMouseUp={viewModel.overlay?.onMouseUp} />
                }
                onMouseDown={viewModel.canvas?.onMouseDown}
                onKeyDown={viewModel.canvas?.onKeyDown}
            >
                {viewModel.nodes.map(node => node.render())}

                {viewModel.additionalElement}
            </Canvas>

            <ActionsBar>
                <ActionButton isActive={viewModel.actions?.idle?.isActive} onClick={viewModel.actions?.idle?.onClick}>
                    <MousePointer2 />
                </ActionButton>

                <ActionButton isActive={viewModel.actions?.stickers?.isActive} onClick={viewModel.actions?.stickers?.onClick}>
                    <StickerIcon />
                </ActionButton>
            </ActionsBar>

            {children}
        </Layout>
    );
}
