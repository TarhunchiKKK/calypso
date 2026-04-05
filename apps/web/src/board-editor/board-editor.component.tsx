"use client";

import type { Id } from "@repo/common";
import type { PropsWithChildren } from "react";
import type { NodesApi } from "@/entities/nodes";
import { useWindowEvents } from "../shared/lib/window";
import { useLayoutDimensionsModel } from "./modules/layout-dimensions";
import { useNodesModel } from "./nodes";
import { ActionsBar } from "./ui/actions-bar.component";
import { Canvas } from "./ui/canvas.component";
import { Dots } from "./ui/dots.component";
import { Layout } from "./ui/layout.component";
import { Overlay } from "./ui/overlay.component";
import { useViewModel } from "./view-model/use-view-model.hook";
import type { NodeBase } from "@repo/boards-common";

type Props = PropsWithChildren<{
    nodes: NodeBase[];

    boardId: Id;

    api: NodesApi;
}>;

export function BoardEditor({ nodes, boardId, children }: Props) {
    const nodesModel = useNodesModel(nodes);

    const layoutDimensionsModel = useLayoutDimensionsModel();

    const viewModel = useViewModel({
        boardId,
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
                onMouseUp={viewModel.canvas?.onMouseUp}
                onKeyDown={viewModel.canvas?.onKeyDown}
            >
                {viewModel.nodes.map(node => node.render())}

                {viewModel.additionalElements?.canvas}
            </Canvas>

            <ActionsBar actions={viewModel.actions} />

            {children}

            {viewModel.additionalElements?.layout}
        </Layout>
    );
}
