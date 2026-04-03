import type { Project } from "@repo/common";
import { Controller, useForm } from "react-hook-form";
import { Button, Field, FieldGroup, FieldLabel, Input } from "@/shared/ui/kit";
import { ProjectsApi } from "../api/projects-api.constants";

type Props = {
    project: Project;

    onCancel?: () => void;
};

export function RenameProjectForm({ project, onCancel }: Props) {
    const form = useForm<Pick<Project, "title">>({
        defaultValues: {
            title: project.title,
        },
    });

    const onSubmit = async (data: Pick<Project, "title">) => {
        await ProjectsApi.updateOne(project.id, data);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel>New title</FieldLabel>

                            <Input
                                {...field}
                                placeholder="Enter new name of this project"
                            />
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="mt-6 flex flex-row justify-start items-center gap-4">
                <Button
                    type="submit"
                    variant="default"
                    size="default"
                    className="cursor-pointer"
                >
                    Rename
                </Button>

                <Button
                    type="reset"
                    variant="outline"
                    size="lg"
                    className="cursor-pointer"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
