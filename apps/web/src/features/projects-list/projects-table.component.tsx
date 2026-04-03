import type { ProjectWithType } from "@repo/common";
import { formatDate } from "@/shared/lib/date";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from "@/shared/ui/kit";

type Props = {
    projects: ProjectWithType[];
};

export function ProjectsTable({ projects }: Props) {
    return (
        <Table>
            <TableCaption>Your projects</TableCaption>

            <TableHead>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Created at</TableHead>
                    <TableHead>Last modified</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHead>

            <TableBody>
                {projects.map(project => (
                    <TableRow key={project.id}>
                        <TableCell>{/* Thumbnail */}</TableCell>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>{project.creator.email}</TableCell>
                        <TableCell>{formatDate(project.createdAt)}</TableCell>
                        <TableCell>{project.updatedAt ? formatDate(project.updatedAt) : "-"}</TableCell>
                        <TableHead></TableHead>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
