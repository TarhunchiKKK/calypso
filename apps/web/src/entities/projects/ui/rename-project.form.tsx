import type { Project, ProjectWithType } from "@repo/common";
import { Controller, useForm } from "react-hook-form";
import { Button, Field, FieldGroup, FieldLabel, Input } from "@/shared/ui/kit";
import { useProjectsApi } from "../model/use-projects-api.hook";

type Props = {
    project: ProjectWithType;
};

export function RenameProjectForm({ project }: Props) {
    const form = useForm<Pick<Project, "title">>({
        defaultValues: {
            title: project.title
        }
    });

    const projectsAPi = useProjectsApi();

    const onSubmit = async (data: Pick<Project, "title">) => {
        await projectsAPi.update.mutateAsync({ id: project.id, type: project.type, title: data.title });
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

                            <Input {...field} placeholder="Enter new name of this project" />
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="mt-6 flex flex-row justify-end items-center gap-4">
                <Button type="submit" variant="default" size="default" className="cursor-pointer">
                    Rename
                </Button>
            </div>
        </form>
    );
}
