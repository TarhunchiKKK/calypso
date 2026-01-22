import { Account } from "src/modules/auth/entities/account.entity";
import { BaseEntity } from "src/shared/db";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Board extends BaseEntity {
    @Column()
    public title: string;

    @ManyToOne(
        () => Account,
        account => account.boards
    )
    public creator: Account;
}
