import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateBoardDto, CreateBoardDtoZodSchema } from "@repo/boards-common";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button, Field, FieldError, FieldGroup, FieldLabel, Input } from "@/shared/ui/kit";
import { useBoardsApi } from "../model/use-boards-api.hook";

type Props = {
    afterSubmit?: () => void;
};

export function CreateBoardForm({ afterSubmit }: Props) {
    const form = useForm<CreateBoardDto>({
        defaultValues: {
            title: "",
            thumbnail: ""
        },
        resolver: zodResolver(CreateBoardDtoZodSchema)
    });

    const boardsApi = useBoardsApi();

    const onSubmit = form.handleSubmit(async data => {
        await boardsApi.create.mutateAsync(data);

        if (boardsApi.create.isError) {
            toast.error("Error creating board");
        } else {
            toast.success("Board created");
            afterSubmit?.();
        }
    });

    return (
        <form onSubmit={onSubmit}>
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
            </FieldGroup>

            <div className="flex flex-row justify-end items-center mt-6">
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
