import { BoardDetailsForm } from "@/entities/boards/ui/board-details-form.component";

export function CurrentUi() {
    return (
        <div className="container mx-auto">
            <BoardDetailsForm
                board={{
                    id: "id",
                    title: "title",
                    description: "description",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    creator: {
                        id: "id",
                        email: "creator@gmail.com",
                    },
                }}
            />
        </div>
    );
}
