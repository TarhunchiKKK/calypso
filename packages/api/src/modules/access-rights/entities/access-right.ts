import type { Id } from "@repo/common";
import type { ProjectRoles } from "@repo/common/dist/projects";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccessRight {
    @PrimaryGeneratedColumn("uuid")
    public id: Id;

    @Column({ type: String })
    public projectId: Id;

    @Column({ type: String })
    public userId: Id;

    @Column({ type: String })
    public role: ProjectRoles;
}
