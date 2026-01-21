import type { Account } from "@repo/common";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class AccountEntity implements Account {
    @PrimaryColumn()
    public username: string;

    @Column()
    public password: string;

    @CreateDateColumn()
    public createdAt: Date;

    @BeforeInsert()
    protected async hashPassword() {
        this.password = await Bun.password.hash(this.password);
    }
}
