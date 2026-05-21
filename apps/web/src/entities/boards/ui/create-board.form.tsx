import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateBoardDto, CreateBoardDtoZodSchema } from "@repo/boards";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { MediaApi } from "@/entities/media";
import { stopPropagationHandler } from "@/shared/lib/events";
import { Button, Field, FieldError, FieldGroup, FieldLabel, Input } from "@/shared/ui/kit";
import { BoardsApi } from "../model/boards.api";

type Props = {
    afterSubmit?: () => void;
};

export function CreateBoardForm({ afterSubmit }: Props) {
    const media = MediaApi.useRandomMedia({ domain: "project-thumbnails" });

    const create = BoardsApi.useCreate();

    const form = useForm<CreateBoardDto>({
        defaultValues: {
            title: "",
            icon: ""
        },
        resolver: zodResolver(CreateBoardDtoZodSchema)
    });

    const onSubmit = form.handleSubmit(async (data) => {
        if (!media) {
            throw new ErrorEvent("CreateBoardForm: Random media is not defined");
        }

        await create.mutateAsync({
            ...data,
            icon: media.url
        });

        if (create.isError) {
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

                            <Input {...field} aria-invalid={fieldState.invalid} placeholder="Enter board title" onKeyDown={stopPropagationHandler} />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="flex flex-row justify-end items-center mt-6">
                <Button type="submit" disabled={create.isPending}>
                    Save
                </Button>
            </div>
        </form>
    );
}
