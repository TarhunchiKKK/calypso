import type { Editor } from "slate";

export type KeyBindings = Record<string, (editor: Editor) => void>;
