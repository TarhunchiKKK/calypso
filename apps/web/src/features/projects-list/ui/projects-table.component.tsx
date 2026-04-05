import type { ProjectWithType } from "@repo/common";
import { ProjectActions } from "@/features/project-actions";
import { formatDate } from "@/shared/lib/date";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/kit";
import {
    ThumbnailStyles,
    ThumbnailsMap,
} from "../constants/thumbnails.constants";

type Props = {
    projects: ProjectWithType[];
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
                            {project.thumbnail ? (
                                <img
                                    src={project.thumbnail}
                                    style={ThumbnailStyles}
                                    alt={project.title}
                                />
                            ) : (
                                ThumbnailsMap[project.type]
                            )}
                        </TableCell>

                        <TableCell className="font-medium">
                            {project.title}
                        </TableCell>

                        <TableCell>{project.creator.email}</TableCell>

                        <TableCell>{formatDate(project.createdAt)}</TableCell>

                        <TableCell>
                            {project.updatedAt
                                ? formatDate(project.updatedAt)
                                : "-"}
                        </TableCell>

                        <TableHead className="text-right">
                            <ProjectActions project={project} />
                        </TableHead>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
