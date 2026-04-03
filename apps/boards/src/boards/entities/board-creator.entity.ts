import type { ProjectCreator } from "@repo/common";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Board } from "./board.entity";

@Entity()
export class BoardCreator implements ProjectCreator {
    @PrimaryColumn()
    public id: string;

    @Column()
    public email: string;

    @OneToMany(
        () => Board,
        board => board.creator
    )
    public boards: Board[];
}
