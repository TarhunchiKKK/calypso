import type { Board as BoardType } from "@repo/boards-common";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Board implements BoardType {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public title: string;

    @Column()
    public creatorId: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt?: Date;
}
