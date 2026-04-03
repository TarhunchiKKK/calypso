/** biome-ignore-all lint/suspicious/noArrayIndexKey: Here items relative order cannot be changed */
import type { Id } from "@repo/common";
import { Input } from "@/shared/ui/kit";
import { ProjectsApi } from "../api/projects-api.constants";
import { ProjectThumbnails } from "../constants/thumbnails.constants";

type Props = {
    projectId: Id;

    onSelect: () => void;
};

export function ProjectThumbnailSelector({ projectId, onSelect }: Props) {
    const onClick = async (thumbnail: string) => {
        await ProjectsApi.updateOne(projectId, {
            thumbnail: thumbnail
        });

        onSelect();
    };

    return (
        <div>
            <div className="grid grid-cols-5">
                {ProjectThumbnails.map((thumbnail, index) => (
                    <div
                        key={index}
                        className="w-12 h-12 hover:bg-secondary/30 cursor-pointer"
                        onClick={() => onClick(thumbnail)}
                    >
                        <img src={thumbnail} alt="" className="w-full h-full" />
                    </div>
                ))}
            </div>

            <div className="mt-5">
                <Input type="file" onChange={e => onClick(e.target.value)} />
            </div>
        </div>
    );
}
