/** biome-ignore-all lint/suspicious/noArrayIndexKey: Here items relative order cannot be changed */
import type { Id } from "@repo/common";
import { Input } from "@/shared/ui/kit";
import { ProjectsApi } from "../api/projects-api.constants";
import { ProjectThumbnails } from "../constants/thumbnails.constants";

type Props = {
    projectId: Id;

    onSelect: () => void;
};

const THUMBNAILS_IN_ROW = 5;

// TODO: implement file uploading to S3
export function ProjectThumbnailSelector({ projectId, onSelect }: Props) {
    const onClick = async (thumbnail: string) => {
        await ProjectsApi.updateOne(projectId, {
            thumbnail: thumbnail,
        });

        onSelect();
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
        <>
            <div className="mb-5">
                {groupedThumbnails.map((group, index) => (
                    <div
                        key={index}
                        className="w-full flex flex-row justify-between items-center"
                    >
                        {group.map((thumbnail, index) => (
                            <div
                                key={index}
                                className="p-2 rounded-md hover:bg-secondary cursor-pointer"
                                onClick={() => onClick(thumbnail)}
                            >
                                <img
                                    src={thumbnail}
                                    alt="Icon"
                                    className="w-12 h-12"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex flex-row justify-center items-center">
                <Input
                    type="file"
                    className="max-w-60 cursor-pointer"
                    onChange={(e) => onClick(e.target.value)}
                />
            </div>
        </>
    );
}
