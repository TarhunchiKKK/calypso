/** biome-ignore-all lint/suspicious/noArrayIndexKey: Here items relative order cannot be changed */

import type { Id } from "@repo/common";
import { Input } from "@/shared/ui/kit";
import { ProjectThumbnails } from "../constants/thumbnails.constants";
import { ProjectsApi } from "../model/use-projects-api.hook";

type Props = {
    projectId: Id;
};

const THUMBNAILS_IN_ROW = 5;

export function ProjectThumbnailSelector({ projectId }: Props) {
    const onClick = async (thumbnail: string) => {
        await ProjectsApi.update(projectId, { thumbnail });
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
