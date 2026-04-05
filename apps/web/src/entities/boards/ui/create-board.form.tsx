import type { Board } from "@repo/boards-common";
import { Controller, useForm } from "react-hook-form";
import { Button, Field, FieldGroup, FieldLabel, Input } from "@/shared/ui/kit";
import { useBoardsApi } from "../model/use-boards-api.hook";

type Props = {
    afterSubmit?: () => void;
}

export function CreateBoardForm({afterSubmit}: Props) {
    const form = useForm<Pick<Board, "title" | "thumbnail">>({
        defaultValues: {
            title: "",
            thumbnail: ""
        }
    });

    const boardsApi = useBoardsApi();

    const onSubmit = async (data: Pick<Board, "title" | "thumbnail">) => {
        await boardsApi.create.mutateAsync(data);

        afterSubmit?.()
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

            <div className="flex flex-row justify-end items-center">
                <Button type="submit" >Save</Button>
            </div>
        </form>
    );
}
