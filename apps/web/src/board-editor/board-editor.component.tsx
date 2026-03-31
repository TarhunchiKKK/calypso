"use client";

import type { Boards, Id } from "@repo/common";
import { MousePointer2, MoveUpRightIcon, StickyNoteIcon, TriangleIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import type { NodesApi } from "@/entities/nodes";
import { useWindowEvents } from "../shared/lib/window";
import { useLayoutDimensionsModel } from "./modules/layout-dimensions";
import { useNodesModel } from "./nodes";
import { ActionButton, ActionsBar } from "./ui/action-bar.component";
import { Canvas } from "./ui/canvas.component";
import { Dots } from "./ui/dots.component";
import { Layout } from "./ui/layout.component";
import { Overlay } from "./ui/overlay.component";
import { useViewModel } from "./view-model/use-view-model.hook";

type Props = PropsWithChildren<{
    nodes: Boards.NodeBase[];

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
                    <Overlay
                        onKeyDown={viewModel.overlay?.onKeyDown}
                        onMouseDown={viewModel.overlay?.onMouseDown}
                        onMouseUp={viewModel.overlay?.onMouseUp}
                    />
                }
                onMouseDown={viewModel.canvas?.onMouseDown}
                onMouseUp={viewModel.canvas?.onMouseUp}
                onKeyDown={viewModel.canvas?.onKeyDown}
            >
                {viewModel.nodes.map(node => node.render())}

                {viewModel.additionalElements?.canvas}
            </Canvas>

            <ActionsBar>
                <ActionButton isActive={viewModel.actions?.idle?.isActive} onClick={viewModel.actions?.idle?.onClick}>
                    <MousePointer2 />
                </ActionButton>

                <ActionButton
                    isActive={viewModel.actions?.stickers?.isActive}
                    onClick={viewModel.actions?.stickers?.onClick}
                >
                    <StickyNoteIcon />
                </ActionButton>

                <ActionButton
                    isActive={viewModel.actions?.arrows?.isActive}
                    onClick={viewModel.actions?.arrows?.onClick}
                >
                    <MoveUpRightIcon />
                </ActionButton>

                <ActionButton
                    isActive={viewModel.actions?.shapes?.isActive}
                    onClick={viewModel.actions?.shapes?.onClick}
                >
                    <TriangleIcon />
                </ActionButton>
            </ActionsBar>

            {children}

            {viewModel.additionalElements?.layout}
        </Layout>
    );
}
