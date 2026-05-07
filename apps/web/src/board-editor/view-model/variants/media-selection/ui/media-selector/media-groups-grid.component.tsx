import type { Id } from "@repo/common";
import { MediaApi } from "@/entities/media";
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/shared/ui/kit";

type Props = {
    onSelect: (groupId: Id) => void;
};

const skeletonsCount = 8;

export function MediaGroupsGrid({ onSelect }: Props) {
    const { data: groups } = MediaApi.useFindPresetsGroups("board-node-media");

    if (!groups) {
        return (
            <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: skeletonsCount }).map((_, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="w-12 h-4" />
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <Skeleton className="w-35 h-35" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-0">
            {groups.map(group => (
                <Card key={group.id} onClick={onSelect.bind(null, group.id)}>
                    <CardHeader>
                        <CardTitle>{group.title}</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <img src={group.thumbnail} alt={group.title} className="w-35 h-35" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
