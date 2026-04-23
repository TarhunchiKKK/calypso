import type { ProjectWithCreator, ProjectWithType } from "@repo/common";
import { EllipsisVertical } from "lucide-react";
import { ProjectActions } from "@/features/project-actions";
import { formatDate } from "@/shared/lib/date";
import { Button, Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/kit";

type Props = {
    projects: ProjectWithCreator<ProjectWithType>[];
};

export function ProjectsTable({ projects }: Props) {
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
                {projects.map(project => (
                    <TableRow key={project.id}>
                        <TableCell>
                            <img src={project.thumbnail} alt={project.title} className="w-10 h-10" />
                        </TableCell>

                        <TableCell className="font-medium">{project.title}</TableCell>

                        <TableCell>{project.creator.email}</TableCell>

                        <TableCell>{formatDate(project.createdAt)}</TableCell>

                        <TableCell>{project.updatedAt ? formatDate(project.updatedAt) : "-"}</TableCell>

                        <TableHead className="text-right">
                            <ProjectActions project={project} />
                        </TableHead>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

const skeletonTableItemsCount = 10;

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

                        <TableCell className="font-medium">
                            <Skeleton className="w-full" />
                        </TableCell>

                        <TableCell>
                            {" "}
                            <Skeleton className="w-full" />
                        </TableCell>

                        <TableCell>
                            <Skeleton className="w-full" />
                        </TableCell>

                        <TableCell>
                            <Skeleton className="w-full" />
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
