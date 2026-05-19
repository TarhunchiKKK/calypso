import type { Board as BoardType } from "@repo/boards";
import type { Id } from "@repo/common";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Board implements BoardType {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public title: string;

    @Column({ nullable: true })
    public description?: string;

    @Column()
    public thumbnail: string;

    @Column()
    public creatorId: Id;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt?: Date;
}
