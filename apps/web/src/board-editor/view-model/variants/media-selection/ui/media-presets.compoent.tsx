import type { Id, MediaGroup } from "@repo/common";
import { useState } from "react";
import { MediaApi } from "@/entities/media";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/kit";

type Props = {
    onSelect: (url: string) => void;
};

function getGroupThumbnail(group: MediaGroup) {
    switch (group.media.length) {
        case 0:
            throw new Error(`Group with id=${group.id} and title=${group.title} has no media.`);
        case 1:
        case 2:
            return (
                <div className="w-full h-full">
                    <img src={group.media[0].url} alt={group.title} className="w-full h-full" />
                </div>
            );
        case 3:
            return (
                <div className="w-full h-full flex flex-row gap-0">
                    <img src={group.media[0].url} alt={group.title} className="w-1/2 h-full" />

                    <div className="flex flex-col gap-0">
                        <img src={group.media[1].url} alt={group.title} className="w-full h-1/2" />
                        <img src={group.media[2].url} alt={group.title} className="w-full h-1/2" />
                    </div>
                </div>
            );
        default:
            return (
                <div className="w-full h-full flex flex-row gap-0">
                    <div className="flex flex-col gap-0">
                        <img src={group.media[0].url} alt={group.title} className="w-full h-1/2" />
                        <img src={group.media[1].url} alt={group.title} className="w-full h-1/2" />
                    </div>

                    <div className="flex flex-col gap-0">
                        <img src={group.media[2].url} alt={group.title} className="w-full h-1/2" />
                        <img src={group.media[3].url} alt={group.title} className="w-full h-1/2" />
                    </div>
                </div>
            );
    }
}

export function MediaPresets() {
    const groups = MediaApi.useFindPresetsGroups("board-node-media");
    const [currentGroupId, setCurrentGroupId] = useState<Id>();

    if (!groups.data?.data) {
        return null;
    }

    return (
        <div className="grid grid-cols-3 gap-0">
            {groups.data.data.map(group => (
                <Card key={group.id}>
                    <CardHeader>
                        <CardTitle>{group.title}</CardTitle>
                    </CardHeader>

                    <CardContent>{getGroupThumbnail(group)}</CardContent>
                </Card>
            ))}
        </div>
    );
}
