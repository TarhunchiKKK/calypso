import type { Board as BoardType } from "@repo/boards-common";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BoardCreator } from "./board-creator.entity";

@Entity()
export class Board implements BoardType {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public title: string;

    @Column({ nullable: true })
    public description?: string;

    @Column({ nullable: true })
    public thumbnail?: string;

    @ManyToOne(
        () => BoardCreator,
        creator => creator.boards
    )
    public creator: BoardCreator;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt?: Date;
}
