import { ProjectThumbnailSelector } from "@/entities/projects/ui/project-thumbnail-selector.component";

export function CurrentUi() {
    return (
        <div className="container mx-auto">
            <ProjectThumbnailSelector projectId="id" onSelect={() => {}} />
        </div>
    );
}
