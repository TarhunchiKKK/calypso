import type { ProjectTypes } from "@repo/common";
import { CreateBoardForm } from "@/entities/boards";

export const ProjectFormsMap: Record<ProjectTypes, (afterSubmit: () => void) => React.ReactNode> = {
    board: afterSubmit => <CreateBoardForm afterSubmit={afterSubmit} />,
    note: () => null
};
