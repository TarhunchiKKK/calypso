import type { Id } from "@repo/common";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Wrapper } from "@/shared/ui";
import { ScrollArea } from "@/shared/ui/kit";
import { MediaGrid } from "./media-grid.component";
import { MediaGroupsGrid } from "./media-groups-grid.component";
import { UploadImageInput } from "./upload-image.input";

type Props = {
    onSelect: (url: string) => void;
};

export function MediaSelector({ onSelect }: Props) {
    const [groupId, setGroupId] = useState<Id>();

    return (
        <ScrollArea className="h-full max-h-175">
            <Wrapper className="h-full">
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
        </ScrollArea>
    );
}
