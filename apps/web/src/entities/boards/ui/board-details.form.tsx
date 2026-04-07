import { zodResolver } from "@hookform/resolvers/zod";
import { type Board, type UpdateBoardDto, UpdateBoardDtoZodSchema } from "@repo/boards-common";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { formatDate } from "@/shared/lib/date";
import { Button, Field, FieldError, FieldGroup, FieldLabel, Input, Textarea } from "@/shared/ui/kit";
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
        defaultValues: board,
        resolver: zodResolver(UpdateBoardDtoZodSchema)
    });

    const boardsApi = useBoardsApi();

    const onSubmit = async (data: UpdateBoardDto) => {
        await boardsApi.update.mutateAsync({
            id: board.id,
            ...data
        });

        if (boardsApi.update.isError) {
            toast.error("Error board updating");
        } else {
            toast.success("Board updated");
            afterSubmit?.();
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Board title</FieldLabel>

                            <Input {...field} aria-invalid={fieldState.invalid} placeholder="Enter board title" />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Description</FieldLabel>

                            <Textarea {...field} aria-invalid={fieldState.invalid} placeholder="Enter board description" />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
