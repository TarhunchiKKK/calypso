import type { Project as ProjectType, ProjectTypes } from "@lib/projects";
import { User } from "src/modules/auth/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Project implements ProjectType {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public type: ProjectTypes;

    @Column({ nullable: false })
    public title: string;

    @Column({ nullable: true, default: null })
    public description?: string | undefined;

    @Column({ nullable: false })
    public icon: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt?: Date | undefined;

    @ManyToOne(() => User)
    public creator: User;
}
