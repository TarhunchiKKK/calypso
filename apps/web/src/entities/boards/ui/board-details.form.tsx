import type { Board, UpdateBoardDto } from "@repo/boards-common";
import { Controller, useForm } from "react-hook-form";
import { formatDate } from "@/shared/lib/date";
import { Button, Field, FieldGroup, FieldLabel, Input, Textarea } from "@/shared/ui/kit";
import { useBoardsApi } from "../model/use-boards-api.hook";

type Props = {
    board: Board;

    afterSubmit?: () => void;
};

const commonFields = [
    {
        label: "Owner",
        value: (board: Board) => board.creator.email
    },
    {
        label: "Created",
        value: (board: Board) => formatDate(board.createdAt)
    },
    {
        label: "Modified",
        value: (board: Board) => (board.updatedAt ? formatDate(board.updatedAt) : "-")
    }
];

export function BoardDetailsForm({ board, afterSubmit }: Props) {
    const form = useForm<UpdateBoardDto>({
        defaultValues: board
    });

    const boardsApi = useBoardsApi();

    const onSubmit = async (data: UpdateBoardDto) => {
        await boardsApi.update.mutateAsync({
            id: board.id,
            ...data
        });

        afterSubmit?.();
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel>Board title</FieldLabel>

                            <Input {...field} placeholder="Enter board title" />
                        </Field>
                    )}
                />

                <Controller
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel>Description</FieldLabel>

                            <Textarea {...field} placeholder="Enter board description" />
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="grid grid-cols-2 mt-8">
                {commonFields.map(field => (
                    <>
                        <div className="text-gray-600 dark:text-gray-400">{field.label}</div>
                        <div>{field.value(board)}</div>
                    </>
                ))}
            </div>

            <div className="flex flex-row justify-end items-center mt-6">
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
