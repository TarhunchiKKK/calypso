import { zodResolver } from "@hookform/resolvers/zod";
import { type ProjectWithType, type UpdateProjectDto, UpdateProjectDtoZodSchema } from "@repo/common";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button, Field, FieldError, FieldGroup, FieldLabel, Input } from "@/shared/ui/kit";
import { useProjectsApi } from "../model/use-projects-api.hook";

type Props = {
    project: ProjectWithType;

    afterSubmit?: () => void;
};

export function RenameProjectForm({ project, afterSubmit }: Props) {
    const form = useForm<UpdateProjectDto>({
        defaultValues: {
            title: project.title
        },
        resolver: zodResolver(UpdateProjectDtoZodSchema)
    });

    const projectsAPi = useProjectsApi();

    const onSubmit = async (data: UpdateProjectDto) => {
        await projectsAPi.update.mutateAsync({ id: project.id, type: project.type, title: data.title });

        if (projectsAPi.update.isError) {
            toast.error("Error renaming");
        } else {
            toast.success("Project renamed");
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
                            <FieldLabel>New title</FieldLabel>

                            <Input {...field} aria-invalid={fieldState.invalid} placeholder="Enter new name of this project" />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="flex flex-row justify-end items-center mt-6">
                <Button type="submit">Rename</Button>
            </div>
        </form>
    );
}
