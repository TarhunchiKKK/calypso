import { BoardEditor } from "@/features/board-editor";
import type { AnyNode } from "@/features/board-editor/nodes";

const mockNodes: AnyNode[] = [
    {
        id: crypto.randomUUID(),
        type: "sticker",
        rect: { x: 100, y: 100, width: 100, height: 100 },
        text: "Hello 1"
    }
    // {
    //     id: crypto.randomUUID(),
    //     type: "sticker",
    //     x: 220,
    //     y: 220,
    //     width: 150,
    //     height: 150,
    //     text: "Hello 2"
    // },
    // {
    //     id: crypto.randomUUID(),
    //     type: "sticker",
    //     x: 460,
    //     y: 180,
    //     width: 100,
    //     height: 100,
    //     text: "Hello 3"
    // }
];

export default function TempPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <BoardEditor nodes={mockNodes} />
        </div>
    );
}
