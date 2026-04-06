/** biome-ignore-all lint/suspicious/noArrayIndexKey: Here items relative order cannot be changed */

import type { ProjectWithType } from "@repo/common";
import { toast } from "sonner";
import { Input } from "@/shared/ui/kit";
import { ProjectThumbnails } from "../constants/thumbnails.constants";
import { useProjectsApi } from "../model/use-projects-api.hook";

type Props = {
    project: ProjectWithType;

    afterSubmit?: () => void;
};

const THUMBNAILS_IN_ROW = 5;

export function ProjectThumbnailSelector({ project, afterSubmit }: Props) {
    const projectsApi = useProjectsApi();

    const onClick = async (thumbnail: string) => {
        await projectsApi.update.mutateAsync({
            id: project.id,
            type: project.type,
            thumbnail: thumbnail
        });

        if (projectsApi.update.isError) {
            toast.error("Thumbnail changing error");
        } else {
            toast.success("Thumbnail changed");
        }

        afterSubmit?.();
    };

    const groupedThumbnails: string[][] = [];

    ProjectThumbnails.forEach((thumbnail, index) => {
        const newIndex = Math.floor(index / THUMBNAILS_IN_ROW);

        if (index % THUMBNAILS_IN_ROW === 0) {
            groupedThumbnails.push([]);
        }

        groupedThumbnails[newIndex].push(thumbnail);
    });

    return (
        <div className="space-y-5">
            <div>
                {groupedThumbnails.map((group, index) => (
                    <div key={index} className="w-full flex flex-row justify-between items-center">
                        {group.map((thumbnail, index) => (
                            <div key={index} className="p-2 rounded-md hover:bg-secondary cursor-pointer" onClick={() => onClick(thumbnail)}>
                                <img src={thumbnail} alt="Icon" className="w-12 h-12" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex flex-row justify-center items-center">
                <Input type="file" className="max-w-60 cursor-pointer" onChange={e => onClick(e.target.value)} />
            </div>
        </div>
    );
}
