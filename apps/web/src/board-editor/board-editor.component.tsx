import type { NodeBase } from "@repo/boards-common";
import type { Id } from "@repo/common";
import type { PropsWithChildren } from "react";
import { useWindowEvents } from "../shared/lib/window";
import { useLayoutDimensionsModel } from "./modules/layout-dimensions";
import { useNodesModel } from "./nodes";
import { useBoardEditorUnmount } from "./nodes/hooks/use-board-editor-unmount.hook";
import { ActionsBar } from "./ui/actions-bar.component";
import { Canvas } from "./ui/canvas.component";
import { Dots } from "./ui/dots.component";
import { Layout } from "./ui/layout.component";
import { Overlay } from "./ui/overlay.component";
import { useViewModel } from "./view-model/use-view-model.hook";

type Props = PropsWithChildren<{
    nodes: NodeBase[];

    boardId: Id;
}>;

export function BoardEditor({ nodes, boardId, children }: Props) {
    const nodesModel = useNodesModel(nodes, boardId);

    const layoutDimensionsModel = useLayoutDimensionsModel();

    const viewModel = useViewModel({
        boardId,
        nodesModel,
        layoutDimensionsModel
    });

    useWindowEvents(viewModel.window || {});

    useBoardEditorUnmount({ boardId: boardId });

    return (
        <Layout onKeyDown={viewModel.layout?.onKeyDown}>
            <Dots offset={layoutDimensionsModel.layoutOffset.offset} zoom={layoutDimensionsModel.layoutZoom.zoom} />

            <Canvas
                offset={layoutDimensionsModel.layoutOffset.offset}
                zoom={layoutDimensionsModel.layoutZoom.zoom}
                overlay={<Overlay {...viewModel.overlay} />}
                {...viewModel.canvas}
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
