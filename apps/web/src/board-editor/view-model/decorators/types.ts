import type { OmitFields } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import type { ViewState } from "../types";
import type { ViewModel, ViewModelParams } from "../types/view-model.types";

export type DecoratableViewModel = OmitFields<ViewModel, "nodes" | "actions"> & { nodes: Decoratable[] };

export type ViewModelDecorator<T = DecoratableViewModel> = (viewModel: DecoratableViewModel, viewState: ViewState, params: ViewModelParams) => T;
