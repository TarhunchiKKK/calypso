import type { ProjectWithCreator, ProjectWithType } from "@repo/projects";
import { EllipsisVertical } from "lucide-react";
import { ProjectActions } from "@/features/project-actions";
import { formatDate } from "@/shared/lib/date";
import { S3Service } from "@/shared/lib/s3";
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
                {projects.map((project) => (
                    <TableRow key={project.id}>
                        <TableCell>
                            <img src={S3Service.getFullUrl(project.icon)} alt={project.title} className="w-10 h-10" />
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
