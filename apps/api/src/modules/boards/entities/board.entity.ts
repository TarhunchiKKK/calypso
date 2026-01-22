import type { Board } from "@repo/common";
import { AccountEntity } from "src/modules/auth/entities/account.entity";
import { BaseEntity } from "src/shared/db";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class BoardEntity extends BaseEntity implements Board {
    @Column()
    public title: string;

    @ManyToOne(
        () => AccountEntity,
        account => account.boards
    )
    public creator: AccountEntity;
}
