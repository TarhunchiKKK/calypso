import type { Id } from "@repo/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccessRight {
    @PrimaryGeneratedColumn("uuid")
    public id: Id;

    @Column({ type: String })
    public resourceId: Id;

    @Column({ type: String })
    public userId: Id;

    @Column({ type: String })
    public role: string;
}
