import type { ProjectTypes } from "@repo/common";

export const ThumbnailStyles = {
    width: 40,
    height: 40
};

export const ThumbnailsMap: Record<ProjectTypes, React.ReactNode> = {
    board: <img src="public/project-thumbnails/board.svg" style={ThumbnailStyles} alt="Board" />,
    note: <img src="public/project-thumbnails/note.svg" style={ThumbnailStyles} alt="Note" />
};
