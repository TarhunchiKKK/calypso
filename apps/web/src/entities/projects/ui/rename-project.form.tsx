import { Field, FieldError, FieldGroup, FieldLabel, Input } from "@/shared/ui/kit";
import type { Project } from "@repo/common";
import { Controller, useForm } from "react-hook-form";

type Props = {
    project: Project;
};

export function RenameProjectForm({ project }: Props) {
    const form = useForm<Pick<Project, "title">>({
        defaultValues: {
            title: project.title
        }
    });

    function onSubmit(data: Pick<Project, "title">) {
        console.log(data);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>
        </form>
    );
}
