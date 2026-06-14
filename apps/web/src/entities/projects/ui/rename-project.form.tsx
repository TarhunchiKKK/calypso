import { zodResolver } from "@hookform/resolvers/zod";
import { type ProjectWithType, type UpdateProjectDto, UpdateProjectDtoZodSchema } from "@lib/projects";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { stopPropagationHandler } from "@/shared/lib/js";
import { Button, Field, FieldError, FieldGroup, FieldLabel, Input } from "@/shared/ui/kit";
import { ProjectsApi } from "../api";

type Props = {
    project: ProjectWithType;

    afterSubmit?: () => void;
};

export function RenameProjectForm({ project, afterSubmit }: Props) {
    const update = ProjectsApi.useUpdate({
        onSuccess: () => {
            toast.success("Project renamed");
            afterSubmit?.();
        },
        onError: () => {
            toast.error("Error renaming");
        }
    });

    const form = useForm<UpdateProjectDto>({
        defaultValues: {
            type: "board",
            title: project.title
        },
        resolver: zodResolver(UpdateProjectDtoZodSchema)
    });

    const onSubmit = form.handleSubmit(async (data) => {
        await update.mutateAsync({
            ...data,
            id: project.id
        });
    });

    return (
        <form onSubmit={onSubmit}>
            <FieldGroup>
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>New title</FieldLabel>

                            <Input
                                {...field}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter new name of this project"
                                onKeyDown={stopPropagationHandler}
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="flex flex-row justify-end items-center mt-6">
                <Button type="submit" disabled={update.isPending}>
                    Rename
                </Button>
            </div>
        </form>
    );
}
