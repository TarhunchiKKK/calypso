import { BoardEditor } from "@/board-editor";
import { MockNodes } from "./mocks/nodes.mock";

export function CurrentUi() {
    return <BoardEditor nodes={MockNodes} boardId="aaa" />;
}
