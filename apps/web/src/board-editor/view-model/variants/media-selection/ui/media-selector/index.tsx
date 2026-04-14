import type { Id } from "@repo/common";
import { ArrowLeftIcon } from "lucide-react";
import { type CSSProperties, useState } from "react";
import { Wrapper } from "@/shared/ui";
import { MediaGrid } from "./media-grid.component";
import { MediaGroupsGrid } from "./media-groups-grid.component";
import { UploadImageInput } from "./upload-image.input";

type Props = {
    style: CSSProperties;

    onSelect: (url: string) => void;
};

export function MediaSelector({ style, onSelect }: Props) {
    const [groupId, setGroupId] = useState<Id>();

    return (
        <Wrapper style={style} className="h-175">
            <div className="flex flex-row justify-center items-center pt-4 pb-6">
                <UploadImageInput onSelect={onSelect} />
            </div>

            {groupId && (
                <div className="pl-2 py-2">
                    <ArrowLeftIcon /> All
                </div>
            )}

            {!groupId && <MediaGroupsGrid onSelect={setGroupId} />}

            {groupId && <MediaGrid groupId={groupId} onSelect={onSelect} />}
        </Wrapper>
    );
}
