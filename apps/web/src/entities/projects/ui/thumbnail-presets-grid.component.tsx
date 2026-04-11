import { Skeleton } from "@/shared/ui/kit";
import { ThumbnailsApi } from "../model/thumbnails.api";

type Props = {
    onSelect: (thumbnail: string) => void;
};

const ROWS_COUNT = 4;
const THUMBNAILS_IN_ROW = 5;

function splitThumbnails(thumbnails: string[]) {
    const result: string[][] = [];

    for (let i = 0; i < thumbnails.length; i += THUMBNAILS_IN_ROW) {
        result.push(thumbnails.slice(i, i + THUMBNAILS_IN_ROW));
    }

    return result;
}

export function ThumbnailPresetsGrid({ onSelect }: Props) {
    const thumbnails = ThumbnailsApi.useGetPresets();

    if (!thumbnails.data) {
        return (
            <div>
                {Array.from({ length: ROWS_COUNT }).map((_, index) => (
                    <div key={index} className="w-full flex flex-row justify-between items-center">
                        {Array.from({ length: THUMBNAILS_IN_ROW }).map((_, index) => (
                            <Skeleton key={index} />
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    const groupedThumbnails = splitThumbnails(thumbnails.data as string[]);

    return (
        <div>
            {groupedThumbnails.map((group, index) => (
                <div key={index} className="w-full flex flex-row justify-between items-center">
                    {group.map((thumbnail, index) => (
                        <div key={index} className="p-2 rounded-md hover:bg-secondary cursor-pointer" onClick={onSelect.bind(null, thumbnail)}>
                            <img src={thumbnail} alt="Icon" className="w-12 h-12" />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
