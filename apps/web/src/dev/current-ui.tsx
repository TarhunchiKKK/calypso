import { NodesApi, NodesFactory } from "@/entities/nodes";
import { Button } from "@/shared/ui/kit";

const boardId = "aaassssssfsdjkcfmrygfyxrhur";
const point = { x: 100, y: 200 };

export function CurrentUi() {
    const { data: nodes } = NodesApi.useFindAll(boardId);
    const { mutateAsync: createMany } = NodesApi.useCreateMany();
    const { mutateAsync: updateMany } = NodesApi.useUpdateMany();
    const { mutateAsync: removeMany } = NodesApi.useRemoveMany();

    const handleCreate = async () => {
        await createMany({
            boardId: boardId,
            nodes: [
                NodesFactory.sticker({ point }),
                NodesFactory.arrow({ point }),
                NodesFactory.text({ point }),
                NodesFactory.shape({ point, variant: "circle" }),
                NodesFactory.media({ point, url: "media-url" }),
                NodesFactory.note({ point }),
                NodesFactory.drawing({ point })
            ]
        });
    };

    const handleUpdate = async () => {
        if (!nodes || nodes.length === 0) {
            console.log("No nodes");
            return;
        }

        await updateMany({
            boardId: boardId,
            nodes: nodes.slice(0, 3)
        });
    };

    const handleRemove = async () => {
        if (!nodes || nodes.length === 0) {
            console.log("No nodes");
            return;
        }

        await removeMany({
            boardId: boardId,
            ids: nodes.slice(0, 3).map(node => node.id)
        });
    };

    return (
        <div className="border-2 border-red-500 p-4">
            <div className="flex flex-row justify-start items-center gap-4 mb-6">
                <Button onClick={handleCreate}>Create</Button>

                <Button onClick={handleUpdate}>Update</Button>

                <Button onClick={handleRemove}>Remove</Button>
            </div>

            <div className="bg-blue-100">
                {(nodes ?? []).map(node => (
                    <div key={node.id}>{`${node.type}  ---  ${node.id} `}</div>
                ))}
            </div>
        </div>
    );
}
