import type { Board as BoardType } from "@lib/boards";
import { User } from "src/modules/auth/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Board implements BoardType {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public title: string;

    @Column({ nullable: true })
    public description?: string;

    @Column()
    public icon: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt?: Date;

    @ManyToOne(() => User)
    public creator: User;
}
