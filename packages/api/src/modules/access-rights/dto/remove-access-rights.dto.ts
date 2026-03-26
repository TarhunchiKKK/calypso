import type { Id } from "@repo/common";

export class RemoveAccessRightDto {
    public projectId: Id;

    public userId: Id;
}
