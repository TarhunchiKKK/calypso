import type { Id } from "@lib/common";
import { MediaApi } from "@/entities/media";
import { Skeleton } from "@/shared/ui/kit";

type Props = {
    groupId: Id;

    onSelect: (url: string) => void;
};

const skeletonsCount = 12;

export function MediaGrid({ groupId, onSelect }: Props) {
    const { data: media } = MediaApi.useFindPresets({
        domain: "board-node-media",
        groupId: groupId
    });

    if (!media) {
        return (
            <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: skeletonsCount }).map((_, index) => (
                    <Skeleton key={index} className="w-full h-full" />
                ))}
            </div>
        );
    }

    const firstPart = media.slice(0, media.length / 2);
    const secondPart = media.slice(media.length / 2);

    return (
        <>
            {[firstPart, secondPart].map((part, index) => (
                <div key={index} className="flex flex-col gap-0">
                    {part.map((media) => (
                        <img key={media.id} src={media.url} alt={media.url} onClick={onSelect.bind(null, media.url)} />
                    ))}
                </div>
            ))}
        </>
    );
}
