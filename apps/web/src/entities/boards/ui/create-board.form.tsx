import type { CreateBoardDto } from "@repo/boards-common";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button, Field, FieldGroup, FieldLabel, Input } from "@/shared/ui/kit";
import { useBoardsApi } from "../model/use-boards-api.hook";

type Props = {
    afterSubmit?: () => void;
};

export function CreateBoardForm({ afterSubmit }: Props) {
    const form = useForm<CreateBoardDto>({
        defaultValues: {
            title: "",
            thumbnail: ""
        }
    });

    const boardsApi = useBoardsApi();

    const onSubmit = async (data: CreateBoardDto) => {
        await boardsApi.create.mutateAsync(data);

        if (boardsApi.create.isError) {
            toast.error("Error creating board");
        } else {
            toast.success("Board created");
        }

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
            </FieldGroup>

            <div className="flex flex-row justify-end items-center mt-6">
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
