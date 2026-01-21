import type { Account } from "@repo/common";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountEntity implements Account {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ unique: true })
    public username: string;

    @Column()
    public password: string;

    @CreateDateColumn()
    public createdAt: Date;
}
