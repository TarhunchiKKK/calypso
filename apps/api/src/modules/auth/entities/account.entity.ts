import type { Account } from "@repo/common";
import { BaseEntity } from "src/shared/db";
import { BeforeInsert, Column, Entity } from "typeorm";

@Entity()
export class AccountEntity extends BaseEntity implements Account {
    @Column({ unique: true })
    public username: string;

    @Column()
    public password: string;

    @BeforeInsert()
    protected async hashPassword() {
        this.password = await Bun.password.hash(this.password);
    }
}
