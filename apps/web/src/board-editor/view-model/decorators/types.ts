import type { OmitFields } from "@lib/common";
import type { Decoratable } from "@/board-editor/core";
import type { ViewModel, ViewModelParams, ViewState } from "../types";

export type DecoratableViewModel = OmitFields<ViewModel, "nodes" | "actions"> & { nodes: Decoratable[] };

export type ViewModelDecorator<T = DecoratableViewModel> = (viewModel: DecoratableViewModel, viewState: ViewState, params: ViewModelParams) => T;
