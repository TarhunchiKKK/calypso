import type { ProjectWithType } from "@lib/projects";
import type { ChangeEvent } from "react";
import { toast } from "sonner";
import { MediaApi } from "@/entities/media";
import { S3Service } from "@/shared/lib/s3";
import { Field, FieldLabel, Input } from "@/shared/ui/kit";
import { ProjectsApi } from "../model/projects.api";
import { IconPresetsGrid } from "./icon-presets-grid.component";

type Props = {
    project: ProjectWithType;

    afterSubmit?: () => void;
};

export function ProjectIconSelector({ project, afterSubmit }: Props) {
    const update = ProjectsApi.useUpdate({
        onSuccess: () => {
            toast.success("Thumbnail changed");
            afterSubmit?.();
        },
        onError: () => {
            toast.error("Thumbnail changing error");
        },
    });

    const getPresignedUrl = MediaApi.useGetPresignedUrl({
        onSuccess: () => {
            toast.success("Thumbnail changed");
            afterSubmit?.();
        },
        onError: () => {
            toast.error("Thumbnail changing error");
        },
    });

    const handleSelect = async (icon: string) => {
        await update.mutateAsync({
            id: project.id,
            type: project.type,
            icon: icon,
        });

        if (update.isError) {
        } else {
            toast.success("Thumbnail changed");
            afterSubmit?.();
        }
    };

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            toast.warning("No file selected");
            return;
        }

        const presignedUrl = await getPresignedUrl.mutateAsync({
            fileName: file.name,
            contentType: file.type,
        });

        await Promise.all([
            update.mutateAsync({
                id: project.id,
                type: project.type,
                icon: presignedUrl.key,
            }),
            S3Service.upload(file, presignedUrl.url),
        ]);
    };

    return (
        <div className="space-y-8">
            <IconPresetsGrid onSelect={handleSelect} />

            <Field className="flex flex-col justify-center items-center">
                <FieldLabel className="text-base">
                    Or select from your device:
                </FieldLabel>

                <Input
                    type="file"
                    placeholder="Choose"
                    onChange={handleUpload}
                    className="
                        max-w-60
                        relative
                        text-transparent
                        file:text-transparent
                        before:content-['Import_file']
                        before:absolute
                        before:top-1/2
                        before:left-1/2
                        before:-translate-x-1/2
                        before:-translate-y-1/2
                        before:pointer-events-none
                        before:text-primary
                        before:font-bold
                    "
                />
            </Field>
        </div>
    );
}
