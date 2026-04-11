import type { ProjectWithType } from "@repo/common";
import type { ChangeEvent } from "react";
import { toast } from "sonner";
import { Input } from "@/shared/ui/kit";
import { ProjectsApi } from "../model/projects.api";
import { ThumbnailsS3ServiceInstance } from "../model/thumbnails.s3-service";
import { ThumbnailPresetsGrid } from "./thumbnail-presets-grid.component";

type Props = {
    project: ProjectWithType;

    afterSubmit?: () => void;
};

export function ProjectThumbnailSelector({ project, afterSubmit }: Props) {
    const update = ProjectsApi.useUpdate();

    const handleSelect = async (thumbnail: string) => {
        await update.mutateAsync({
            id: project.id,
            type: project.type,
            thumbnail: thumbnail
        });

        if (update.isError) {
            toast.error("Thumbnail changing error");
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

        const key = ThumbnailsS3ServiceInstance.generateKey(file);

        try {
            await Promise.all([
                update.mutateAsync({
                    id: project.id,
                    type: project.type,
                    thumbnail: key
                }),
                ThumbnailsS3ServiceInstance.upload(key, file)
            ]).then(() => {
                toast.success("Thumbnail changed");
                afterSubmit?.();
            });
        } catch (_) {
            toast.error("Thumbnail changing error");
        }
    };

    return (
        <div className="space-y-5">
            <ThumbnailPresetsGrid onSelect={handleSelect} />

            <div className="flex flex-row justify-center items-center">
                <Input type="file" className="max-w-60 cursor-pointer" onChange={handleUpload} />
            </div>
        </div>
    );
}
