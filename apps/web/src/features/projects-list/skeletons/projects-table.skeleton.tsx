import { EllipsisVertical } from "lucide-react";
import { Button, Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/kit";

const skeletonTableItemsCount = 10;
const titleCellColSpan = 4;

export function ProjectsTableSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead className="w-30">Created at</TableHead>
                    <TableHead className="w-30">Last modified</TableHead>
                    <TableHead className="w-10"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {Array.from({ length: skeletonTableItemsCount }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Skeleton className="w-10 h-10" />
                        </TableCell>

                        <TableCell colSpan={titleCellColSpan} className="font-medium">
                            <Skeleton className="w-full h-4" />
                        </TableCell>

                        <TableHead className="text-right">
                            <Button variant="ghost" size="icon">
                                <EllipsisVertical />
                            </Button>
                        </TableHead>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
